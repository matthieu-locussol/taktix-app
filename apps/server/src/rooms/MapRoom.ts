import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   MapRoomMessage,
   MapRoomResponse,
   MapState,
   MapRoomOptions as Options,
   PlayerState,
   StatisticMgt,
   TELEPORTATION_SPOTS,
   Room as TRoom,
   TalentMgt,
   MapRoomUserData as UserData,
   _assert,
   isMapRoomMessage,
} from 'shared';
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
         },
      });

      if (characterInfos === null) {
         return;
      }

      const results = TalentMgt.isProgressionValid(
         TalentMgt.deserializeTalents(characterInfos.talents),
         TalentMgt.deserializeTalents(talents),
         characterInfos.talentsPoints,
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
         },
      });

      if (characterInfos === null) {
         return;
      }

      const results = StatisticMgt.isProgressionValid(
         StatisticMgt.deserializeStatistics(statistics),
         StatisticMgt.deserializeStatistics(characterInfos.baseStatistics),
         characterInfos.baseStatisticsPoints,
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
         },
      });

      this.state.removePlayer(client.sessionId);
   }

   onDispose() {
      logger.info(`[MapRoom][${this.name}] Room disposed`);
   }
}
