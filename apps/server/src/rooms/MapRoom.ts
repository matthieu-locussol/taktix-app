import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   FightMgt,
   LevelMgt,
   MINIMUM_TURN_TIME,
   MapRoomMessage,
   MapRoomResponse,
   MapState,
   MapRoomOptions as Options,
   PlayerState,
   PvEFightParameters,
   PvEFightResults,
   STATISTICS_POINTS_PER_LEVEL,
   StatisticMgt,
   StringMgt,
   TALENTS_POINTS_PER_LEVEL,
   TELEPORTATION_PLACES,
   TELEPORTATION_SPOTS,
   Room as TRoom,
   TalentMgt,
   MapRoomUserData as UserData,
   _assert,
   getMonstersInformations,
   isMapRoomMessage,
   zProfessionType,
} from 'shared';
import { WeaponType } from 'shared/dist/types/Weapon';
import { match } from 'ts-pattern';
import { prisma } from '../utils/prisma';
import { usersMap } from './utils/usersMap';

type Client = ColyseusClient<UserData, unknown>;

export class MapRoom extends Room<MapState> {
   name: TRoom;

   constructor(name: TRoom) {
      super();

      this.name = name;
   }

   onCreate(_options: Options) {
      logger.info(`[MapRoom][${this.name}] Room created`);

      this.setState(new MapState());

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
               .with({ type: 'saveTeleporter' }, (payload) =>
                  this.onSaveTeleporter(client, payload),
               )
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
      });
      _assert(characterInfos, `Character infos for name '${characterName}' should be defined`);
      const { pos_x, pos_y, direction: savedDirection } = characterInfos;
      const characterPosition = position ?? { x: pos_x, y: pos_y };
      const characterDirection = direction ?? savedDirection;

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

      this.state.createPlayer(
         client.sessionId,
         characterName,
         characterInfos.profession,
         characterPosition.x,
         characterPosition.y,
         characterDirection,
         characterInfos.health,
         StringMgt.deserializeTeleporters(characterInfos.teleporters),
      );
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

      const characterInfos = await prisma.character.findUnique({
         where: { name: player.name },
         select: {
            talents: true,
            talentsPoints: true,
            experience: true,
         },
      });

      if (characterInfos === null) {
         return;
      }

      const results = TalentMgt.isProgressionValid(
         TalentMgt.deserializeTalents(characterInfos.talents),
         TalentMgt.deserializeTalents(talents),
         characterInfos.talentsPoints,
         characterInfos.experience,
      );

      if (results.valid) {
         await prisma.character.update({
            where: { name: player.name },
            data: {
               talents,
               talentsPoints: results.remainingPoints,
            },
         });

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

      const characterInfos = await prisma.character.findUnique({
         where: { name: player.name },
         select: {
            baseStatistics: true,
            baseStatisticsPoints: true,
            experience: true,
         },
      });

      if (characterInfos === null) {
         return;
      }

      const results = StatisticMgt.isProgressionValid(
         StatisticMgt.deserializeStatistics(statistics),
         StatisticMgt.deserializeStatistics(characterInfos.baseStatistics),
         characterInfos.baseStatisticsPoints,
         characterInfos.experience,
      );

      if (results.valid) {
         await prisma.character.update({
            where: { name: player.name },
            data: {
               baseStatistics: statistics,
               baseStatisticsPoints: results.remainingPoints,
            },
         });

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
      { message: { monsterGroupId } }: Extract<MapRoomMessage, { type: 'fightPvE' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      if (player.isFight) {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) tried to start a PvE fight while already in a fight | Might be a cheat attempt`,
         );
         return;
      }

      this.state.startFight(client.sessionId);

      const characterInfos = await prisma.character.findUnique({
         where: { name: player.name },
         select: {
            baseStatistics: true,
            talents: true,
            map: true,
            experience: true,
            profession: true,
            name: true,
         },
      });

      if (characterInfos === null) {
         logger.error(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) tried to start a PvE fight but failed because character infos were not found`,
         );
         return;
      }

      const realStatistics = StatisticMgt.computeRealStatistics(
         StatisticMgt.aggregateStatistics(
            StatisticMgt.deserializeStatistics(characterInfos.baseStatistics),
            characterInfos.experience,
            zProfessionType.parse(characterInfos.profession),
            TalentMgt.deserializeTalents(characterInfos.talents),
         ),
      );

      player.setMaxHealth(realStatistics.vitality);

      try {
         const parameters: PvEFightParameters = {
            alliesInformations: [
               {
                  name: characterInfos.name,
                  health: player.getHealth(),
                  magicShield: realStatistics.magicShield,
                  experience: characterInfos.experience,
                  level: LevelMgt.getLevel(characterInfos.experience),
                  profession: zProfessionType.parse(characterInfos.profession),
                  rawStatistics: characterInfos.baseStatistics,
                  talents: TalentMgt.deserializeTalents(characterInfos.talents),
                  uniquesPowers: [],
                  // TODO: get weapon from character equipment
                  weaponType: WeaponType.Sword1H,
                  weaponDamages: [
                     { type: 'strength', min: 2, max: 6 },
                     { type: 'luck', min: 2, max: 6 },
                     { type: 'intelligence', min: 2, max: 6 },
                  ],
               },
            ],
            monstersInformations: getMonstersInformations(monsterGroupId),
         };

         const packet: MapRoomResponse = {
            type: 'fightPvE',
            message: {
               results: FightMgt.computePvEFight(parameters),
            },
         };

         const allyInfosIdx = packet.message.results.allies.findIndex(
            ({ name }) => name === player.name,
         );
         if (allyInfosIdx !== -1) {
            const allyInfos = packet.message.results.allies[allyInfosIdx];
            const experienceGained = packet.message.results.experiences[allyInfosIdx];

            const newLevel = LevelMgt.getLevel(characterInfos.experience + experienceGained);
            const oldLevel = LevelMgt.getLevel(characterInfos.experience);

            if (newLevel > oldLevel) {
               const newRealStatistics = StatisticMgt.computeRealStatistics(
                  StatisticMgt.aggregateStatistics(
                     StatisticMgt.deserializeStatistics(characterInfos.baseStatistics),
                     characterInfos.experience + experienceGained,
                     zProfessionType.parse(characterInfos.profession),
                     TalentMgt.deserializeTalents(characterInfos.talents),
                  ),
               );

               player.setMaxHealth(newRealStatistics.vitality);
               player.setHealth(newRealStatistics.vitality);
            } else {
               player.setHealth(Math.max(1, allyInfos.health));
            }
         }

         this.state.setFightTurns(client.sessionId, packet.message.results.turns.length);
         client.send(packet.type, packet.message);

         logger.info(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${
               player.name
            }) started a PvE fight against monster group '${monsterGroupId}' and ${
               packet.message.results.won ? 'won' : 'lost'
            }`,
         );

         this.onFightPvEResults(client, packet.message.results);
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

      const packet: Extract<MapRoomResponse, { type: 'stopFightingResponse' }> = {
         type: 'stopFightingResponse',
         message: {
            players: [...this.state.players.values()].map((player) => ({
               name: player.name,
               x: player.x,
               y: player.y,
               direction: player.direction,
               profession: zProfessionType.parse(player.profession),
               isFight: player.isFight,
            })),
         },
      };

      client.send(packet.type, packet.message);
   }

   async onTeleport(
      client: Client,
      { message: { room } }: Extract<MapRoomMessage, { type: 'teleport' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      if (room === this.name) {
         return;
      }

      if (!player.teleporters.includes(room)) {
         return;
      }

      const place = TELEPORTATION_PLACES[room];
      _assert(place, `Teleportation place for room '${room}' should be defined`);
      const { direction, x, y } = place;

      // TODO: make sure the player is on the teleportation spot
      // TODO: substract the money for the teleportation

      const packet: Extract<MapRoomResponse, { type: 'changeMap' }> = {
         type: 'changeMap',
         message: {
            map: room,
            x,
            y,
            direction,
         },
      };

      client.send(packet.type, packet.message);
   }

   async onSaveTeleporter(
      client: Client,
      { message: { room } }: Extract<MapRoomMessage, { type: 'saveTeleporter' }>,
   ) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      const place = TELEPORTATION_PLACES[room];

      if (room !== this.name || place === undefined) {
         const packet: Extract<MapRoomResponse, { type: 'saveTeleporterResponse' }> = {
            type: 'saveTeleporterResponse',
            message: {
               success: false,
            },
         };
         client.send(packet.type, packet.message);
         return;
      }

      await prisma.character.update({
         where: { name: player.name },
         data: {
            teleporters: StringMgt.serializeTeleporters([...player.teleporters, room]),
         },
      });

      const packet: Extract<MapRoomResponse, { type: 'saveTeleporterResponse' }> = {
         type: 'saveTeleporterResponse',
         message: {
            success: true,
         },
      };

      client.send(packet.type, packet.message);
   }

   async onFightPvEResults(client: Client, results: PvEFightResults) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      if (results.won) {
         const charactersInfos = (
            await prisma.character.findMany({
               where: { name: { in: results.allies.map(({ name }) => name) } },
               select: {
                  name: true,
                  baseStatisticsPoints: true,
                  talentsPoints: true,
               },
            })
         ).reduce<Record<string, { baseStatisticsPoints: number; talentsPoints: number }>>(
            (acc, { name, ...rest }) => ({ ...acc, [name]: rest }),
            {},
         );

         const updates = results.allies.map(({ name, experience }, idx) => {
            const experienceGained = results.experiences[idx];
            const newExperience = experience + experienceGained;

            const levelGained = LevelMgt.computeGainedLevels(experience, newExperience);
            const baseStatisticsPointsGained = levelGained * STATISTICS_POINTS_PER_LEVEL;
            const talentsPointsGained = levelGained * TALENTS_POINTS_PER_LEVEL;

            return {
               name: results.allies[idx].name,
               experience: newExperience,
               talentsPoints: charactersInfos[name].talentsPoints + talentsPointsGained,
               baseStatisticsPoints:
                  charactersInfos[name].baseStatisticsPoints + baseStatisticsPointsGained,
            };
         });

         prisma.$transaction(
            updates.map(({ name, experience, talentsPoints, baseStatisticsPoints }) =>
               prisma.character.update({
                  where: { name },
                  data: {
                     experience,
                     talentsPoints,
                     baseStatisticsPoints,
                  },
               }),
            ),
         );
      }

      logger.info(`[MapRoom][${this.name}] Updated characters after the fight`);
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
            pos_x: player.x,
            pos_y: player.y,
            direction: player.direction,
            health: player.getHealth(),
         },
      });

      this.state.removePlayer(client.sessionId);
   }

   onDispose() {
      logger.info(`[MapRoom][${this.name}] Room disposed`);
   }
}
