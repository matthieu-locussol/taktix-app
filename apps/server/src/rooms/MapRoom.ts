import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   FightMgt,
   INTERACTIVE_OBJECTS_MAP,
   ItemMgt,
   ItemPosition,
   LootMgt,
   MINIMUM_TURN_TIME,
   MapRoomMessage,
   MapRoomResponse,
   MapState,
   NumberMgt,
   MapRoomOptions as Options,
   PlayerState,
   PvEFightParameters,
   StatisticMgt,
   StringMgt,
   TELEPORTATION_PLACES,
   TELEPORTATION_SPOTS,
   Room as TRoom,
   TalentMgt,
   MapRoomUserData as UserData,
   WeaponDamages,
   _assert,
   getMonstersInformations,
   isMapRoomMessage,
   zCharacterSprite,
   zItemType,
} from 'shared';
import { match } from 'ts-pattern';
import { prisma } from '../utils/prisma';
import { drinkWineInteraction } from './interactions/drinkWineInteraction';
import { saveTeleporterInteraction } from './interactions/saveTeleporterInteraction';
import { sleepInteraction } from './interactions/sleepInteraction';
import { usersMap } from './utils/usersMap';

type Client = ColyseusClient<UserData, unknown>;

const DEFAULT_WEAPON_DAMAGES: WeaponDamages[] = [
   { weaponType: 'sword1H', type: 'strength', min: 1, max: 2 },
];

export class MapRoom extends Room<MapState> {
   name: TRoom;

   constructor(name: TRoom) {
      super();

      this.name = name;
      this.autoDispose = false;
   }

   onCreate(_options: Options) {
      logger.info(`[MapRoom][${this.name}] Room created`);

      this.setState(new MapState());
      this.state.startFightsRegeneration(this.name);

      this.onMessage('*', (client: Client, type: unknown, message: unknown) => {
         logger.info(
            `[MapRoom][${this.name}] Received message from '${client.sessionId}': '${JSON.stringify(
               message,
            )}'`,
         );

         const packet = {
            type,
            message,
         };

         if (isMapRoomMessage(packet)) {
            match(packet)
               .with({ type: 'move' }, (payload) => this.onMove(client, payload))
               .with({ type: 'stopMoving' }, (payload) => this.onStopMoving(client, payload))
               .with({ type: 'updateTalents' }, (payload) => this.onUpdateTalents(client, payload))
               .with({ type: 'updateStatistics' }, (payload) =>
                  this.onUpdateStatistics(client, payload),
               )
               .with({ type: 'fightPvE' }, (payload) => this.onFightPvE(client, payload))
               .with({ type: 'stopFighting' }, (payload) => this.onStopFighting(client, payload))
               .with({ type: 'teleport' }, (payload) => this.onTeleport(client, payload))
               .with({ type: 'equipItem' }, (payload) => this.onEquipItem(client, payload))
               .with({ type: 'unequipItem' }, (payload) => this.onUnequipItem(client, payload))
               .with({ type: 'interact' }, (payload) => this.onInteract(client, payload))
               .with({ type: 'recycle' }, (payload) => this.onRecycle(client, payload))
               .with({ type: 'spinWheel' }, (payload) => this.onSpinWheel(client, payload))
               .exhaustive();
         } else {
            logger.error(
               `[MapRoom][${this.name}] Received invalid message from '${client.sessionId}'`,
            );
         }
      });
   }

   async onJoin(client: Client, { uuid, position, direction }: Options) {
      const userInfos = usersMap.get(uuid);
      _assert(userInfos, `User infos for uuid '${uuid}' should be defined`);
      usersMap.set(uuid, { ...userInfos, gameRoomClient: client });
      const { characterName } = userInfos;

      if (position !== undefined) {
         const { x, y } = position;
         logger.info(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${characterName}) joined the room at (${x}, ${y}) - ${direction}`,
         );
      } else {
         logger.info(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${characterName}) joined the room`,
         );
      }

      const characterInfos = await prisma.character.findUnique({
         where: { name: characterName },
         include: { items: true },
      });
      _assert(characterInfos, `Character infos for name '${characterName}' should be defined`);
      const { pos_x, pos_y, direction: savedDirection } = characterInfos;
      const characterPosition = position ?? { x: pos_x, y: pos_y };
      const characterDirection = direction ?? savedDirection;

      this.state.createPlayer(client.sessionId, {
         id: characterInfos.id,
         name: characterName,
         spritesheet: characterInfos.spritesheet,
         x: characterPosition.x,
         y: characterPosition.y,
         direction: characterDirection,
         profession: characterInfos.profession,
         talents: characterInfos.talents,
         talentsPoints: characterInfos.talentsPoints,
         baseStatistics: characterInfos.baseStatistics,
         baseStatisticsPoints: characterInfos.baseStatisticsPoints,
         experience: characterInfos.experience,
         health: characterInfos.health,
         teleporters: characterInfos.teleporters,
         money: characterInfos.money,
         gachix: characterInfos.gachix,
         items: characterInfos.items.map((item) => ({
            ...item,
            type: zItemType.parse(item.type),
            baseAffixes: ItemMgt.deserializeAffixes(item.baseAffixes),
            prefixes: ItemMgt.deserializeAffixes(item.prefixes),
            suffixes: ItemMgt.deserializeAffixes(item.suffixes),
            damages: ItemMgt.deserializeDamages(item.damages),
         })),
      });

      if (position !== undefined && direction !== undefined) {
         await prisma.character.update({
            where: { name: characterName },
            data: {
               map: this.name,
               pos_x: position.x,
               pos_y: position.y,
               direction,
            },
         });
      }
   }

   onMove(client: Client, { message: { x, y } }: Extract<MapRoomMessage, { type: 'move' }>) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      logger.info(
         `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) moved to (${x}, ${y})`,
      );

      this.state.movePlayer(client.sessionId, x, y);
   }

   onStopMoving(
      client: Client,
      { message: { direction, x, y } }: Extract<MapRoomMessage, { type: 'stopMoving' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      logger.info(
         `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) stopped moving`,
      );

      player.stopMoving(direction, x, y);
      this.checkTeleportationSpots(client, player);
   }

   async onUpdateTalents(
      client: Client,
      { message: { talents } }: Extract<MapRoomMessage, { type: 'updateTalents' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      const results = TalentMgt.isProgressionValid(
         player.talents,
         TalentMgt.deserializeTalents(talents),
         player.talentsPoints,
         player.experience,
      );

      if (results.valid) {
         player.setTalents(talents);
         player.setTalentsPoints(results.remainingPoints);

         logger.info(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) updated talents successfully`,
         );
      } else {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) tried to update talents but failed`,
         );
      }
   }

   async onUpdateStatistics(
      client: Client,
      { message: { statistics } }: Extract<MapRoomMessage, { type: 'updateStatistics' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      const results = StatisticMgt.isProgressionValid(
         StatisticMgt.deserializeStatistics(statistics),
         player.baseStatistics,
         player.baseStatisticsPoints,
         player.experience,
      );

      if (results.valid) {
         player.setBaseStatistics(statistics);
         player.setBaseStatisticsPoints(results.remainingPoints);

         logger.info(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) updated statistics successfully`,
         );
      } else {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) tried to update statistics but failed`,
         );
      }
   }

   async onFightPvE(
      client: Client,
      { message: { id, monsterGroupId } }: Extract<MapRoomMessage, { type: 'fightPvE' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      if (player.isFight) {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) tried to start a PvE fight while already in a fight | Might be a cheat attempt`,
         );
         return;
      }

      if (!(this.state.fights.has(id) && this.state.fights.get(id)?.fightId === monsterGroupId)) {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) tried to start a PvE fight with an invalid id or monsterGroupId | Might be a cheat attempt`,
         );
         return;
      }

      this.state.removeFight(id);
      this.state.startFight(client.sessionId);

      const realStatistics = player.getRealStatistics();

      try {
         const monstersInformations = getMonstersInformations(monsterGroupId);
         const parameters: PvEFightParameters = {
            areaLootBonus: 100,
            areaExperienceBonus: 100,
            // TODO: handle multiple allies
            alliesInformations: [
               {
                  name: player.name,
                  health: player.health,
                  magicShield: realStatistics.magicShield,
                  experience: player.experience,
                  level: player.getLevel(),
                  profession: player.profession,
                  spritesheet: zCharacterSprite.parse(player.spritesheet),
                  rawStatistics: StatisticMgt.serializeStatistics(player.baseStatistics),
                  items: player.getEquippedItems(),
                  talents: player.talents,
                  uniquesPowers: [],
                  weaponDamages: player.getEquippedWeaponDamages() ?? DEFAULT_WEAPON_DAMAGES,
               },
            ],
            monstersInformations,
         };

         const results = FightMgt.computePvEFight(parameters);

         if (results.won) {
            const createdItems = await Promise.all(
               results.loots.map((loots, idx) => {
                  const characterName = results.allies[idx].name;
                  const characterInfos = [...usersMap.values()].find(
                     (user) => user.characterName === characterName,
                  );

                  if (characterInfos === undefined || characterInfos.gameRoomClient === null) {
                     return;
                  }

                  const { gameRoomClient } = characterInfos;

                  const allyPlayer = this.state.players.get(gameRoomClient.sessionId);
                  if (allyPlayer === undefined) {
                     return;
                  }

                  return prisma.$transaction(
                     loots.map(
                        ({
                           isUnique,
                           level,
                           baseAffixes,
                           prefixes,
                           suffixes,
                           damages,
                           requiredLevel,
                           type,
                           position,
                        }) =>
                           prisma.item.create({
                              data: {
                                 isUnique,
                                 level,
                                 baseAffixes: ItemMgt.serializeAffixes(baseAffixes),
                                 prefixes: ItemMgt.serializeAffixes(prefixes),
                                 suffixes: ItemMgt.serializeAffixes(suffixes),
                                 damages: ItemMgt.serializeDamages(damages),
                                 requiredLevel,
                                 type,
                                 characterId: allyPlayer.id,
                                 position,
                              },
                           }),
                     ),
                  );
               }),
            );

            createdItems.forEach((items, idx) => {
               const { name } = results.allies[idx];
               const user = [...usersMap.values()].find(
                  ({ characterName }) => characterName === name,
               );

               if (user !== undefined && user.gameRoomClient !== null) {
                  const allyPlayer = this.state.players.get(user.gameRoomClient.sessionId);
                  if (allyPlayer !== undefined && items !== undefined) {
                     allyPlayer.addItems(
                        items.map((item) => ({
                           ...item,
                           type: zItemType.parse(item.type),
                           baseAffixes: ItemMgt.deserializeAffixes(item.baseAffixes),
                           prefixes: ItemMgt.deserializeAffixes(item.prefixes),
                           suffixes: ItemMgt.deserializeAffixes(item.suffixes),
                           damages: ItemMgt.deserializeDamages(item.damages),
                        })),
                     );
                  }
               }

               if (items !== undefined) {
                  items.forEach((item, itemIdx) => {
                     results.loots[idx][itemIdx].id = item.id;
                  });
               }
            });
         }

         const alliesMoney = results.allies.reduce<Record<string, number>>(
            (acc, { name }) => ({
               ...acc,
               [name]: results.won ? LootMgt.computeMoneyEarned(monstersInformations) : 0,
            }),
            {},
         );

         const packet: MapRoomResponse = {
            type: 'fightPvE',
            message: { results, alliesMoney },
         };

         const allyInfosIdx = results.allies.findIndex(({ name }) => name === player.name);
         if (allyInfosIdx !== -1) {
            const allyInfos = results.allies[allyInfosIdx];
            const experienceGained = results.experiences[allyInfosIdx];

            player.setHealth(Math.max(1, allyInfos.health));
            player.addExperience(experienceGained);
         }

         player.setMoney(player.money + alliesMoney[player.name]);
         player.setFightTurns(results.turns.length);
         client.send(packet.type, packet.message);

         logger.info(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${
               player.name
            }) started a PvE fight against monster group '${monsterGroupId}' and ${
               results.won ? 'won' : 'lost'
            }`,
         );
      } catch (error) {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) tried to start a PvE fight against an invalid monster group '${monsterGroupId}'`,
            error,
         );

         this.state.stopFight(client.sessionId);
      }
   }

   async onStopFighting(client: Client, _: Extract<MapRoomMessage, { type: 'stopFighting' }>) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      if (Date.now() - player.fightTimestamp < player.fightTurns * MINIMUM_TURN_TIME) {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' tried to stop a fight after the allowed time | Might be a cheat attempt`,
         );
      }

      this.state.stopFight(client.sessionId);
   }

   async onTeleport(
      client: Client,
      { message: { room } }: Extract<MapRoomMessage, { type: 'teleport' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      if (room === this.name || !player.teleporters.includes(room)) {
         return;
      }

      const place = TELEPORTATION_PLACES[room];
      _assert(place, `Teleportation place for room '${room}' should be defined`);
      const { direction, x, y } = place;

      if (player.money < place.price) {
         return;
      }

      player.setMoney(player.money - place.price);

      const packet: Extract<MapRoomResponse, { type: 'changeMap' }> = {
         type: 'changeMap',
         message: { map: room, x, y, direction, money: place.price },
      };

      client.send(packet.type, packet.message);
   }

   async onEquipItem(
      client: Client,
      { message: { id } }: Extract<MapRoomMessage, { type: 'equipItem' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      const item = player.items.find((item) => item.id === id);
      if (item === undefined) {
         return;
      }

      if (ItemMgt.canEquipItem(item, player.getLevel())) {
         const { itemsToRemove, canEquip } = ItemMgt.itemsToRemoveAfterEquip(
            item,
            player.getEquippedItems(),
         );
         itemsToRemove.forEach((itemId) => {
            player.unequipItem(itemId);
         });

         if (canEquip) {
            player.equipItem(item.id);
         }
      }

      logger.info(
         `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) equipped item '${item.id}'`,
      );
   }

   async onUnequipItem(
      client: Client,
      { message: { id } }: Extract<MapRoomMessage, { type: 'unequipItem' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      const item = player.items.find((item) => item.id === id);
      if (item === undefined) {
         return;
      }

      player.unequipItem(id);

      logger.info(
         `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) unequipped item '${item.id}'`,
      );
   }

   async sleepInteraction(client: Client, player: PlayerState) {
      if (INTERACTIVE_OBJECTS_MAP[this.name].Bed === false) {
         return false;
      }

      player.setHealthAtMax();
      logger.info(`[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) slept`);
      return true;
   }

   async onInteract(
      client: Client,
      { message: { id } }: Extract<MapRoomMessage, { type: 'interact' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      const sendInteractResponsePacket = (success: boolean) => {
         const packet: Extract<MapRoomResponse, { type: 'interactResponse' }> = {
            type: 'interactResponse',
            message: {
               id,
               success,
            },
         };

         client.send(packet.type, packet.message);
      };

      match(id)
         .with('Sleep', async () => {
            const success = await sleepInteraction(client, player, this.name);
            sendInteractResponsePacket(success);
         })
         .with('SaveTeleporter', async () => {
            const success = await saveTeleporterInteraction(client, player, this.name);
            sendInteractResponsePacket(success);
         })
         .with('DrinkWine', async () => {
            const success = await drinkWineInteraction(client, player, this.name);
            sendInteractResponsePacket(success);
         })
         .exhaustive();
   }

   async onRecycle(
      client: Client,
      { message: { itemsIds } }: Extract<MapRoomMessage, { type: 'recycle' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      const items = player.items.filter((item) => itemsIds.includes(item.id));
      if (items.length !== itemsIds.length) {
         const packet: Extract<MapRoomResponse, { type: 'recycleResponse' }> = {
            type: 'recycleResponse',
            message: {
               success: false,
               gachix: 0,
               itemsDestroyed: [],
            },
         };
         client.send(packet.type, packet.message);
         return;
      }

      const gachixGained = ItemMgt.recycleItems(items);
      player.addGachix(gachixGained);
      player.removeItems(itemsIds);

      const packet: Extract<MapRoomResponse, { type: 'recycleResponse' }> = {
         type: 'recycleResponse',
         message: {
            success: true,
            gachix: gachixGained,
            itemsDestroyed: itemsIds,
         },
      };
      client.send(packet.type, packet.message);
   }

   async onSpinWheel(client: Client, _: Extract<MapRoomMessage, { type: 'spinWheel' }>) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      if (player.gachix <= 0) {
         const packet: Extract<MapRoomResponse, { type: 'spinWheelResponse' }> = {
            type: 'spinWheelResponse',
            message: {
               success: false,
               item: null,
               itemRarity: null,
               lootBonus: null,
            },
         };
         client.send(packet.type, packet.message);
         return;
      }

      const lootBonus = NumberMgt.random(50, 500);
      const item = LootMgt.computeOneLoot({
         areaBonus: lootBonus,
         monsterLevel: player.getLevel(),
         monsterName: 'enemy-green-slime',
         monsterType: 'common',
         prospect: player.getRealStatistics().prospect,
      });
      const itemRarity = ItemMgt.getRarity(item);

      const { id } = await prisma.item.create({
         data: {
            isUnique: item.isUnique,
            level: item.level,
            baseAffixes: ItemMgt.serializeAffixes(item.baseAffixes),
            prefixes: ItemMgt.serializeAffixes(item.prefixes),
            suffixes: ItemMgt.serializeAffixes(item.suffixes),
            damages: ItemMgt.serializeDamages(item.damages),
            requiredLevel: item.requiredLevel,
            type: item.type,
            characterId: player.id,
            position: ItemPosition.Inventory,
         },
      });

      const createdItem = { ...item, id };
      player.removeGachix(1);
      player.addItems([createdItem]);

      const packet: Extract<MapRoomResponse, { type: 'spinWheelResponse' }> = {
         type: 'spinWheelResponse',
         message: {
            success: true,
            item: createdItem,
            itemRarity,
            lootBonus,
         },
      };

      client.send(packet.type, packet.message);
   }

   checkTeleportationSpots(client: Client, player: PlayerState) {
      const teleportationSpots = TELEPORTATION_SPOTS[this.name];

      for (const { x, y, destinationMapName, destinationMapData } of teleportationSpots) {
         if (player.x === x && player.y === y) {
            const { entrancePosition, entranceDirection } = destinationMapData;
            _assert(entrancePosition);
            _assert(entranceDirection);

            const packet: Extract<MapRoomResponse, { type: 'changeMap' }> = {
               type: 'changeMap',
               message: {
                  map: destinationMapName,
                  x: entrancePosition.x,
                  y: entrancePosition.y,
                  direction: entranceDirection,
               },
            };

            client.send(packet.type, packet.message);
         }
      }
   }

   async onLeave(client: Client, _consented: boolean) {
      const player = this.state.players.get(client.sessionId);
      if (player === undefined) {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' left the room but was not in it`,
         );
         return;
      }

      logger.info(
         `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) left the room`,
      );

      await prisma.character.update({
         where: { name: player.name },
         data: {
            map: this.name,
            profession: player.profession,
            spritesheet: player.spritesheet,
            pos_x: player.x,
            pos_y: player.y,
            direction: player.direction,
            talents: TalentMgt.serializeTalents(player.talents),
            talentsPoints: player.talentsPoints,
            baseStatistics: StatisticMgt.serializeStatistics(player.getBaseStatistics()),
            baseStatisticsPoints: player.baseStatisticsPoints,
            experience: player.experience,
            health: player.health,
            teleporters: StringMgt.serializeTeleporters(player.teleporters),
            money: player.money,
            gachix: player.gachix,
            items: {
               deleteMany: player.itemsToRemove.map((id) => ({ id })),
               updateMany: player.items.map((item) => ({
                  where: { id: item.id },
                  data: {
                     isUnique: item.isUnique,
                     type: item.type,
                     level: item.level,
                     requiredLevel: item.requiredLevel,
                     baseAffixes: ItemMgt.serializeAffixes(item.baseAffixes),
                     prefixes: ItemMgt.serializeAffixes(item.prefixes),
                     suffixes: ItemMgt.serializeAffixes(item.suffixes),
                     damages: ItemMgt.serializeDamages(item.damages),
                     position: item.position,
                  },
               })),
            },
         },
      });

      this.state.removePlayer(client.sessionId);
   }

   onDispose() {
      logger.info(`[MapRoom][${this.name}] Room disposed`);
   }
}
