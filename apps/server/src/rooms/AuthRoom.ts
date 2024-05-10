import { Client as ColyseusClient, Room, logger } from '@colyseus/core';
import {
   AuthRoomMessage,
   CustomProtocol,
   DEFAULT_BASE_STATISTICS,
   DEFAULT_BASE_STATISTICS_POINTS,
   DEFAULT_DIRECTION,
   DEFAULT_EXPERIENCE,
   DEFAULT_HEALTH,
   DEFAULT_MAP,
   DEFAULT_MONEY,
   DEFAULT_TALENTS,
   DEFAULT_TALENTS_POINTS,
   DEFAULT_TELEPORTERS,
   DEFAULT_X,
   DEFAULT_Y,
   ItemMgt,
   MAX_CHARACTERS_PER_ACCOUNT,
   AuthRoomOptions as Options,
   StatisticMgt,
   StringMgt,
   TalentMgt,
   AuthRoomUserData as UserData,
   _assert,
   _assertTrue,
   isAuthRoomMessage,
   zCharacterSprite,
   zProfessionType,
} from 'shared';
import { AuthRoomResponse } from 'shared/src/rooms/AuthRoom';
import { match } from 'ts-pattern';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/hashPassword';
import { prisma } from '../utils/prisma';
import { removeDanglingUsers, usersMap } from './utils/usersMap';

type Client = ColyseusClient<UserData, unknown>;

interface UserInformations {
   username: string;
   client: Client;
}

export class AuthRoom extends Room {
   users = new Map<string, UserInformations>();

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

      const maintenance = await prisma.maintenance.findFirst({
         where: { done: false },
      });

      if (maintenance !== null) {
         logger.info(
            `[AuthRoom] Client '${client.sessionId}' failed to authenticate because of the maintenance`,
         );
         return false;
      }

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
         characters: user.characters.map(({ name, spritesheet, experience }) => ({
            name,
            spritesheet: zCharacterSprite.parse(spritesheet),
            experience,
         })),
      };

      if (this.userIsAlreadyLoggedIn(username)) {
         logger.info(
            `[AuthRoom] Client '${client.sessionId}' caused the disconnection of another client with the same username '${username}'`,
         );
         this.disconnectUserWithSameUsername(client, username);
      }

      logger.info(`[AuthRoom] Client '${client.sessionId}' successfully authenticated`);
      return true;
   }

   userIsAlreadyLoggedIn(usernameToCheck: string) {
      for (const [, { username }] of this.users) {
         if (username === usernameToCheck) {
            return true;
         }
      }

      for (const [, { username }] of usersMap) {
         if (username === usernameToCheck) {
            return true;
         }
      }

      return false;
   }

   disconnectUserWithSameUsername(client: Client, usernameToLogOut: string) {
      for (const [uuid, { username, authRoomClient, chatRoomClient, gameRoomClient }] of usersMap) {
         if (username === usernameToLogOut) {
            if (authRoomClient !== null) {
               _assertTrue(authRoomClient.id !== client.id);
               authRoomClient.leave(CustomProtocol.DISCONNECT_FROM_OTHER_SESSION);
            }

            if (chatRoomClient !== null) {
               chatRoomClient.leave(CustomProtocol.DISCONNECT_FROM_OTHER_SESSION);
            }

            if (gameRoomClient !== null) {
               gameRoomClient.leave(CustomProtocol.DISCONNECT_FROM_OTHER_SESSION);
            }

            usersMap.delete(uuid);
         }
      }

      for (const [clientId, { username, client: userClient }] of this.users) {
         if (username === usernameToLogOut) {
            userClient.leave(CustomProtocol.DISCONNECT_FROM_OTHER_SESSION);
            this.users.delete(clientId);
         }
      }
   }

   onJoin(client: Client, options: Options) {
      logger.info(`[AuthRoom] Client '${client.sessionId}' joined the room`);
      _assert(client.userData, 'userData should be defined');
      this.users.set(client.id, { username: options.username, client });
      client.send('userData', client.userData);
   }

   async onSelectCharacter(
      client: Client,
      { message: { characterName } }: Extract<AuthRoomMessage, { type: 'selectCharacter' }>,
   ) {
      const userInformations = this.users.get(client.id);
      _assert(userInformations, 'userInformations should be defined');
      const { username } = userInformations;

      const character = await prisma.character.findUnique({
         where: { name: characterName },
         include: { user: true, items: true },
      });

      let message:
         | Extract<AuthRoomResponse, { type: 'selectCharacterResponse' }>['message']
         | null = null;

      if (character === null) {
         message = {
            status: 'error',
            errorMessage: 'characterDoesNotExist',
            errorMessageOptions: {
               name: characterName,
            },
         };
      } else if (character.user.username !== username) {
         message = {
            status: 'error',
            errorMessage: 'characterDoesNotBelongToUser',
            errorMessageOptions: {
               name: characterName,
               username,
            },
         };
      } else {
         const uuid = uuidv4();

         message = {
            status: 'success',
            uuid,
            map: character.map,
            posX: character.pos_x,
            posY: character.pos_y,
            direction: character.direction,
            talents: character.talents,
            talentsPoints: character.talentsPoints,
            baseStatistics: character.baseStatistics,
            baseStatisticsPoints: character.baseStatisticsPoints,
            experience: character.experience,
            profession: zProfessionType.parse(character.profession),
            spritesheet: zCharacterSprite.parse(character.spritesheet),
            health: character.health,
            teleporters: character.teleporters,
            money: character.money,
            items: character.items.map((item) => ItemMgt.serializePrismaItem(item)),
         };

         usersMap.set(uuid, {
            username,
            characterName: character.name,
            role: character.user.role,
            authRoomClient: client,
            gameRoomClient: null,
            chatRoomClient: null,
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
      {
         message: { characterName, profession, spritesheet },
      }: Extract<AuthRoomMessage, { type: 'createCharacter' }>,
   ) {
      const userInformations = this.users.get(client.id);
      _assert(userInformations, 'userInformations should be defined');
      const { username } = userInformations;

      let message:
         | Extract<AuthRoomResponse, { type: 'createCharacterResponse' }>['message']
         | null = null;

      if (StringMgt.isReservedName(characterName)) {
         message = {
            status: 'error',
            errorMessage: 'characterAlreadyExists',
            errorMessageOptions: {
               name: characterName,
            },
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
            errorMessage: 'characterAlreadyExists',
            errorMessageOptions: {
               name: characterName,
            },
         };
      } else if (userCharacters.length >= MAX_CHARACTERS_PER_ACCOUNT) {
         message = {
            status: 'error',
            errorMessage: 'maximumCharactersReached',
            errorMessageOptions: {},
         };
      } else if (!StringMgt.isCharacterNameValid(characterName)) {
         message = {
            status: 'error',
            errorMessage: 'invalidCharacterName',
            errorMessageOptions: {},
         };
      } else {
         await prisma.character.create({
            data: {
               name: characterName,
               profession: zProfessionType.parse(profession),
               spritesheet: zCharacterSprite.parse(spritesheet),
               pos_x: DEFAULT_X,
               pos_y: DEFAULT_Y,
               direction: DEFAULT_DIRECTION,
               map: DEFAULT_MAP,
               talents: TalentMgt.serializeTalents(DEFAULT_TALENTS),
               talentsPoints: DEFAULT_TALENTS_POINTS,
               baseStatistics: StatisticMgt.serializeStatistics(DEFAULT_BASE_STATISTICS),
               baseStatisticsPoints: DEFAULT_BASE_STATISTICS_POINTS,
               experience: DEFAULT_EXPERIENCE,
               health: DEFAULT_HEALTH,
               teleporters: StringMgt.serializeTeleporters(DEFAULT_TELEPORTERS),
               money: DEFAULT_MONEY,
               user: {
                  connect: {
                     username,
                  },
               },
            },
         });

         message = {
            status: 'success',
            characters: [
               ...userCharacters.map((entry) => ({
                  profession: zProfessionType.parse(entry.profession),
                  spritesheet: zCharacterSprite.parse(entry.spritesheet),
                  name: entry.name,
                  experience: entry.experience,
               })),
               {
                  profession,
                  spritesheet,
                  name: characterName,
                  experience: DEFAULT_EXPERIENCE,
               },
            ].sort((a, b) => b.experience - a.experience),
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
      const userInformations = this.users.get(client.id);
      _assert(userInformations, 'userInformations should be defined');
      const { username } = userInformations;

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
            errorMessage: 'invalidPassword',
            errorMessageOptions: {},
         };
      } else if (!user.characters.some((entry) => entry.name === characterName)) {
         message = {
            status: 'error',
            errorMessage: 'characterDoesNotExist',
            errorMessageOptions: {},
         };
      } else {
         await prisma.character.delete({
            where: { name: characterName },
         });

         message = {
            status: 'success',
            characters: user.characters
               .filter((entry) => entry.name !== characterName)
               .map((entry) => ({
                  spritesheet: zCharacterSprite.parse(entry.spritesheet),
                  name: entry.name,
                  experience: entry.experience,
               })),
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
      removeDanglingUsers();
   }

   onDispose() {
      logger.info('[AuthRoom] Room disposed');
   }
}
