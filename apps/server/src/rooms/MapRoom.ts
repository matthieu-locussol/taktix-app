import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   MapRoomMessage,
   MapRoomResponse,
   MapState,
   MapRoomOptions as Options,
   PlayerState,
   TELEPORTATION_SPOTS,
   Room as TRoom,
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
               .exhaustive();
         } else {
            logger.error(
               `[MapRoom][${this.name}] Received invalid message from '${client.sessionId}'`,
            );
         }
      });
   }

   async onJoin(client: Client, { uuid, position }: Options) {
      const userInfos = usersMap.get(uuid);
      _assert(userInfos, `User infos for uuid '${uuid}' should be defined`);
      const { characterName } = userInfos;

      if (position !== undefined) {
         const { x, y } = position;
         logger.info(
            `[MapRoom][${this.name}] Client '${client.sessionId}' (${characterName}) joined the room at (${x}, ${y})`,
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
      const { pos_x, pos_y } = characterInfos;
      const characterPosition = position ?? { x: pos_x, y: pos_y };

      this.state.createPlayer(
         client.sessionId,
         characterName,
         characterPosition.x,
         characterPosition.y,
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

   onStopMoving(client: Client, _payload: Extract<MapRoomMessage, { type: 'stopMoving' }>) {
      const player = this.state.players.get(client.sessionId);
      _assert(player, `Player for client '${client.sessionId}' should be defined`);

      logger.info(
         `[MapRoom][${this.name}] Client '${client.sessionId}' (${player.name}) stopped moving`,
      );

      this.checkTeleportationSpots(client, player);
   }

   checkTeleportationSpots(client: Client, player: PlayerState) {
      const teleportationSpots = TELEPORTATION_SPOTS[this.name];

      for (const { x, y, destinationMapName, destinationMapData } of teleportationSpots) {
         if (player.x === x && player.y === y) {
            const { entrancePosition } = destinationMapData;
            _assert(entrancePosition);

            const packet: Extract<MapRoomResponse, { type: 'changeMap' }> = {
               type: 'changeMap',
               message: {
                  map: destinationMapName,
                  x: entrancePosition.x,
                  y: entrancePosition.y,
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
         },
      });

      this.state.removePlayer(client.sessionId);
   }

   onDispose() {
      logger.info(`[MapRoom][${this.name}] Room disposed`);
   }
}
