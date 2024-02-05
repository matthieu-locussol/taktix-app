import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   Channel,
   ChannelMgt,
   ChatRoomMessage,
   ChatRoomResponse,
   ChatRoomOptions as Options,
   ChatRoomUserData as UserData,
   _assert,
   isChatRoomMessage,
} from 'shared';
import { match } from 'ts-pattern';
import { usersMap } from './utils/usersMap';

type Client = ColyseusClient<UserData, unknown>;

export class ChatRoom extends Room {
   characterByClientId = new Map<string, string>();

   clientIdByCharacter = new Map<string, Client>();

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
      const character = this.characterByClientId.get(client.id);
      _assert(character, 'character should be defined');
      const { channel, content } = message;

      if (ChannelMgt.isPrivateMessage(content)) {
         this.onPrivateMessage(client, content);
      } else {
         const packet: ChatRoomResponse = {
            type: 'message',
            message: {
               ...ChannelMgt.getPrefixedChannelNameAndContent(content, channel),
               author: character,
            },
         };

         this.broadcast(packet.type, packet.message);
      }
   }

   onPrivateMessage(client: Client, message: string) {
      const character = this.characterByClientId.get(client.id);
      _assert(character, 'character should be defined');
      const { target, content } = ChannelMgt.extractPrivateMessage(message);

      const packet: ChatRoomResponse = {
         type: 'privateMessage',
         message: {
            author: character,
            target,
            content,
         },
      };

      const targetClient = this.clientIdByCharacter.get(target);
      if (targetClient !== undefined) {
         this.send(client, packet.type, packet.message);
         this.send(targetClient, packet.type, packet.message);
      } else {
         const errorPacket: ChatRoomResponse = {
            type: 'message',
            message: {
               author: 'Server',
               channel: Channel.ERROR,
               content: `User '${target}' does not exist or is not connected!`,
            },
         };

         this.send(client, errorPacket.type, errorPacket.message);
      }
   }

   onJoin(client: Client, { uuid }: Options) {
      logger.info(`[ChatRoom] Client '${client.sessionId}' joined the room`);

      const userInfos = usersMap.get(uuid);
      _assert(userInfos, `User infos for uuid '${uuid}' should be defined`);
      const { characterName } = userInfos;

      this.characterByClientId.set(client.id, characterName);
      this.clientIdByCharacter.set(characterName, client);

      const packet: ChatRoomResponse = {
         type: 'message',
         message: {
            author: 'Server',
            channel: Channel.SERVER,
            content: `${characterName} logged in!`,
         },
      };

      this.broadcast(packet.type, packet.message, { except: client });

      const clientPacket: ChatRoomResponse = {
         type: 'message',
         message: {
            author: 'Server',
            channel: Channel.SERVER,
            content: `Connected to server {{SERVER_URL}}!`,
         },
      };

      client.send(clientPacket.type, clientPacket.message);
   }

   onLeave(client: Client, _consented: boolean) {
      logger.info(`[AuthRoom] Client '${client.sessionId}' left the room`);

      const character = this.characterByClientId.get(client.id);
      _assert(character, 'character should be defined');
      this.characterByClientId.delete(client.id);

      const clientEntry = this.clientIdByCharacter.get(character);
      _assert(clientEntry, 'clientId should be defined');
      this.clientIdByCharacter.delete(character);

      const packet: ChatRoomResponse = {
         type: 'message',
         message: {
            author: 'Server',
            channel: Channel.SERVER,
            content: `${character} logged out :'(`,
         },
      };

      this.broadcast(packet.type, packet.message, { except: client });
   }

   onDispose() {
      logger.info(`[ChatRoom] Room disposed`);
   }
}
