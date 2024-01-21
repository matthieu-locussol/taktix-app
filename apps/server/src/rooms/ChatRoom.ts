import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   ChatRoomMessage,
   ChatRoomResponse,
   ChatRoomOptions as Options,
   ChatRoomUserData as UserData,
   _assert,
   isChatRoomMessage,
} from 'shared';
import { match } from 'ts-pattern';
import { usersMap } from './usersMap';

type Client = ColyseusClient<UserData, unknown>;

export class ChatRoom extends Room {
   characters = new Map<string, string>();

   onCreate(_options: Options) {
      logger.info('[ChatRoom] Room created');

      this.onMessage('*', (client: Client, type: unknown, message: unknown) => {
         logger.info(
            `[ChatRoom] Received message from '${client.sessionId}': '${type}' -> '${JSON.stringify(
               message,
            )}'`,
         );

         const packet = {
            type,
            message,
         };

         if (isChatRoomMessage(packet)) {
            match(packet)
               .with({ type: 'message' }, (payloadMessage) =>
                  this.onUserMessage(client, payloadMessage.message),
               )
               .exhaustive();
         } else {
            logger.error(`[ChatRoom] Received invalid message from '${client.sessionId}'`);
         }
      });
   }

   onUserMessage(
      client: Client,
      message: Extract<ChatRoomMessage, { type: 'message' }>['message'],
   ) {
      const character = this.characters.get(client.id);
      _assert(character, 'character should be defined');

      const packet: ChatRoomResponse = {
         type: 'message',
         message: {
            author: character,
            ...message,
         },
      };

      this.broadcast(packet.type, packet.message);
   }

   onJoin(client: Client, { uuid }: Options) {
      logger.info(`[ChatRoom] Client '${client.sessionId}' joined the room`);

      const userInfos = usersMap.get(uuid);
      _assert(userInfos, `User infos for uuid '${uuid}' should be defined`);
      const { characterName } = userInfos;

      this.characters.set(client.id, characterName);

      const packet: ChatRoomResponse = {
         type: 'message',
         message: {
            author: 'Server',
            channel: 0,
            content: `${characterName} logged in!`,
         },
      };

      this.broadcast(packet.type, packet.message, { except: client });

      const clientPacket: ChatRoomResponse = {
         type: 'message',
         message: {
            author: 'Server',
            channel: 1,
            content: `Connected to server {{SERVER_URL}}!`,
         },
      };

      client.send(clientPacket.type, clientPacket.message);
   }

   onLeave(client: Client, _consented: boolean) {
      logger.info(`[AuthRoom] Client '${client.sessionId}' left the room`);

      const character = this.characters.get(client.id);
      _assert(character, 'character should be defined');

      this.characters.delete(client.id);

      const packet: ChatRoomResponse = {
         type: 'message',
         message: {
            author: 'Server',
            channel: 0,
            content: `${character} logged out :'(`,
         },
      };

      this.broadcast(packet.type, packet.message, { except: client });
   }

   onDispose() {
      logger.info(`[ChatRoom] Room disposed`);
   }
}
