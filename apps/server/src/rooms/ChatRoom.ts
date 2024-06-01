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
import { removeDanglingUsers, usersMap } from './utils/usersMap';

export let notifyMaintenance: (() => void) | null = null;

type Client = ColyseusClient<UserData, unknown>;

interface CharacterInfos {
   name: string;
   uuid: string;
}

export class ChatRoom extends Room {
   characterInfosByClientId = new Map<string, CharacterInfos>();

   clientIdByCharacterName = new Map<string, Client>();

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

      notifyMaintenance = () => {
         const packet: ChatRoomResponse = {
            type: 'message',
            message: {
               author: 'Server',
               channel: Channel.SERVER,
               content: `A maintenance has started. From now on, every action you do might be lost, so please log out as soon as possible. Thank you for your understanding.`,
            },
         };

         this.broadcast(packet.type, packet.message);
      };
   }

   onUserMessage(
      client: Client,
      message: Extract<ChatRoomMessage, { type: 'message' }>['message'],
   ) {
      const characterInfos = this.characterInfosByClientId.get(client.id);
      _assert(characterInfos, 'character should be defined');
      const { name, uuid } = characterInfos;
      const { channel, content } = message;
      const userInfos = usersMap.get(uuid);
      _assert(userInfos, `User infos for uuid '${uuid}' should be defined`);
      const { role } = userInfos;

      if (ChannelMgt.isPrivateMessage(content)) {
         this.onPrivateMessage(client, content);
      } else {
         const packet: ChatRoomResponse = {
            type: 'message',
            message: {
               ...ChannelMgt.getPrefixedChannelNameAndContent(content, channel),
               author: name,
            },
         };

         if (ChannelMgt.hasPermission(role, packet.message.channel)) {
            this.broadcast(packet.type, packet.message);
         } else {
            const errorPacket: ChatRoomResponse = {
               type: 'message',
               message: {
                  author: 'Server',
                  channel: Channel.ERROR,
                  content: `You don't have permissions to send a message in this channel!`,
               },
            };

            client.send(errorPacket.type, errorPacket.message);
         }
      }
   }

   onPrivateMessage(client: Client, message: string) {
      const characterInfos = this.characterInfosByClientId.get(client.id);
      _assert(characterInfos, 'character should be defined');
      const { name } = characterInfos;
      const { target, content } = ChannelMgt.extractPrivateMessage(message);
      const targetClient = this.clientIdByCharacterName.get(target);

      const packet: ChatRoomResponse = {
         type: 'privateMessage',
         message: {
            author: name,
            target,
            content,
         },
      };

      if (targetClient !== undefined) {
         if (targetClient.id !== client.id) {
            client.send(packet.type, packet.message);
            targetClient.send(packet.type, packet.message);
         } else {
            const errorPacket: ChatRoomResponse = {
               type: 'message',
               message: {
                  author: 'Server',
                  channel: Channel.ERROR,
                  content: `You can't send a private message to yourself!`,
               },
            };

            client.send(errorPacket.type, errorPacket.message);
         }
      } else {
         const errorPacket: ChatRoomResponse = {
            type: 'message',
            message: {
               author: 'Server',
               channel: Channel.ERROR,
               content: `User '${target}' does not exist or is not connected!`,
            },
         };

         client.send(errorPacket.type, errorPacket.message);
      }
   }

   onJoin(client: Client, { uuid }: Options) {
      logger.info(`[ChatRoom] Client '${client.sessionId}' joined the room`);

      const userInfos = usersMap.get(uuid);
      _assert(userInfos, `User infos for uuid '${uuid}' should be defined`);
      usersMap.set(uuid, { ...userInfos, chatRoomClient: client });
      const { characterName } = userInfos;

      this.characterInfosByClientId.set(client.id, { name: characterName, uuid });
      this.clientIdByCharacterName.set(characterName, client);

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
            content: `Connected to ${
               process.env.NODE_ENV === 'production' ? 'production' : 'development'
            } server!`,
         },
      };

      client.send(clientPacket.type, clientPacket.message);
   }

   onLeave(client: Client, _consented: boolean) {
      logger.info(`[AuthRoom] Client '${client.sessionId}' left the room`);

      const characterInfos = this.characterInfosByClientId.get(client.id);
      _assert(characterInfos, 'character should be defined');
      this.characterInfosByClientId.delete(client.id);

      const clientEntry = this.clientIdByCharacterName.get(characterInfos.name);
      _assert(clientEntry, 'clientId should be defined');
      this.clientIdByCharacterName.delete(characterInfos.name);

      const packet: ChatRoomResponse = {
         type: 'message',
         message: {
            author: 'Server',
            channel: Channel.SERVER,
            content: `${characterInfos.name} logged out :'(`,
         },
      };

      this.broadcast(packet.type, packet.message, { except: client });

      setTimeout(() => removeDanglingUsers(), 1000);
   }

   onDispose() {
      notifyMaintenance = null;
      logger.info(`[ChatRoom] Room disposed`);
   }
}
