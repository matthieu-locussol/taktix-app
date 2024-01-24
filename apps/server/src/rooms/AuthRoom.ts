import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   AuthRoomMessage,
   DEFAULT_MAP,
   DEFAULT_X,
   DEFAULT_Y,
   INTERNAL_PLAYER_NAME,
   MAX_CHARACTERS_PER_ACCOUNT,
   AuthRoomOptions as Options,
   AuthRoomUserData as UserData,
   _assert,
   isAuthRoomMessage,
} from 'shared';
import { AuthRoomResponse } from 'shared/src/rooms/AuthRoom';
import { match } from 'ts-pattern';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/hashPassword';
import { prisma } from '../utils/prisma';
import { usersMap } from './utils/usersMap';

type Client = ColyseusClient<UserData, unknown>;

export class AuthRoom extends Room {
   users = new Map<string, string>();

   onCreate(_options: Options) {
      logger.info('[AuthRoom] Room created');

      this.onMessage('*', (client: Client, type: unknown, message: unknown) => {
         logger.info(
            `[AuthRoom] Received message from '${client.sessionId}': '${type}' -> '${JSON.stringify(
               message,
            )}'`,
         );

         const packet = {
            type,
            message,
         };

         if (isAuthRoomMessage(packet)) {
            match(packet)
               .with({ type: 'selectCharacter' }, (payloadMessage) =>
                  this.onSelectCharacter(client, payloadMessage),
               )
               .with({ type: 'createCharacter' }, (payloadMessage) =>
                  this.onCreateCharacter(client, payloadMessage),
               )
               .with({ type: 'deleteCharacter' }, (payloadMessage) =>
                  this.onDeleteCharacter(client, payloadMessage),
               )
               .exhaustive();
         } else {
            logger.error(`[AuthRoom] Received invalid message from '${client.sessionId}'`);
         }
      });
   }

   async onAuth(client: Client, options: Options) {
      logger.info(`[AuthRoom] Client '${client.sessionId}' authenticating...`);

      const { username, password } = options;
      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.findUnique({
         where: { username, password: hashedPassword },
         include: { characters: true },
      });

      if (user === null) {
         logger.error(`[AuthRoom] Client '${client.sessionId}' failed to authenticate`);
         return false;
      }

      client.userData = {
         characters: user.characters.map(({ name }) => name),
      };

      logger.info(`[AuthRoom] Client '${client.sessionId}' successfully authenticated`);
      return true;
   }

   onJoin(client: Client, options: Options) {
      logger.info(`[AuthRoom] Client '${client.sessionId}' joined the room`);
      _assert(client.userData, 'userData should be defined');
      this.users.set(client.id, options.username);
      client.send('userData', client.userData);
   }

   async onSelectCharacter(
      client: Client,
      { message: { characterName } }: Extract<AuthRoomMessage, { type: 'selectCharacter' }>,
   ) {
      const username = this.users.get(client.id);
      _assert(username, 'username should be defined');

      const character = await prisma.character.findUnique({
         where: { name: characterName },
         include: { user: true },
      });

      let message:
         | Extract<AuthRoomResponse, { type: 'selectCharacterResponse' }>['message']
         | null = null;

      if (character === null) {
         message = {
            status: 'error',
            errorMessage: `Character "${characterName}" does not exist!`,
         };
      } else if (character.user.username !== username) {
         message = {
            status: 'error',
            errorMessage: `Character "${characterName}" does not belong to user "${username}"!`,
         };
      } else {
         const uuid = uuidv4();

         message = {
            status: 'success',
            uuid,
            map: character.map,
            posX: character.pos_x,
            posY: character.pos_y,
         };

         usersMap.set(uuid, {
            username,
            characterName: character.name,
         });
      }

      const packet: AuthRoomResponse = {
         type: 'selectCharacterResponse',
         message,
      };

      client.send(packet.type, packet.message);
   }

   async onCreateCharacter(
      client: Client,
      { message: { characterName } }: Extract<AuthRoomMessage, { type: 'createCharacter' }>,
   ) {
      const username = this.users.get(client.id);
      _assert(username, 'username should be defined');

      let message:
         | Extract<AuthRoomResponse, { type: 'createCharacterResponse' }>['message']
         | null = null;

      if (characterName === INTERNAL_PLAYER_NAME) {
         message = {
            status: 'error',
            errorMessage: `Character name "${characterName}" already exists!`,
         };
      }

      const [character, userCharacters] = await Promise.all([
         prisma.character.findUnique({
            where: { name: characterName },
         }),
         prisma.character.findMany({
            where: { user: { username } },
         }),
      ]);

      if (character !== null) {
         message = {
            status: 'error',
            errorMessage: `Character name "${characterName}" already exists!`,
         };
      } else if (userCharacters.length >= MAX_CHARACTERS_PER_ACCOUNT) {
         message = {
            status: 'error',
            errorMessage: `Maximum number of characters reached!`,
         };
      } else {
         await prisma.character.create({
            data: {
               name: characterName,
               pos_x: DEFAULT_X,
               pos_y: DEFAULT_Y,
               map: DEFAULT_MAP,
               user: {
                  connect: {
                     username,
                  },
               },
            },
         });

         message = {
            status: 'success',
            characters: [...userCharacters.map((entry) => entry.name), characterName],
         };
      }

      const packet: AuthRoomResponse = {
         type: 'createCharacterResponse',
         message,
      };

      client.send(packet.type, packet.message);
   }

   async onDeleteCharacter(
      client: Client,
      {
         message: { characterName, password },
      }: Extract<AuthRoomMessage, { type: 'deleteCharacter' }>,
   ) {
      const username = this.users.get(client.id);
      _assert(username, 'username should be defined');
      const hashedPassword = await hashPassword(password);

      let message:
         | Extract<AuthRoomResponse, { type: 'deleteCharacterResponse' }>['message']
         | null = null;

      const user = await prisma.user.findUnique({
         where: {
            username,
            password: hashedPassword,
         },
         include: { characters: true },
      });

      if (user === null) {
         message = {
            status: 'error',
            errorMessage: 'Invalid password!',
         };
      } else if (!user.characters.some((entry) => entry.name === characterName)) {
         message = {
            status: 'error',
            errorMessage: `Character "${characterName}" does not exist!`,
         };
      } else {
         await prisma.character.delete({
            where: { name: characterName },
         });

         message = {
            status: 'success',
            characters: user.characters
               .filter((entry) => entry.name !== characterName)
               .map((entry) => entry.name),
         };
      }

      const packet: AuthRoomResponse = {
         type: 'deleteCharacterResponse',
         message,
      };

      client.send(packet.type, packet.message);
   }

   onLeave(client: Client, _consented: boolean) {
      logger.info(`[AuthRoom] Client '${client.sessionId}' left the room`);
      this.users.delete(client.id);
   }

   onDispose() {
      logger.info('[AuthRoom] Room disposed');
   }
}
