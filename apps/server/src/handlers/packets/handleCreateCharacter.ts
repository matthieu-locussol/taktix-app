import {
   ClientPacketType,
   DEFAULT_MAP,
   DEFAULT_X,
   DEFAULT_Y,
   INTERNAL_PLAYER_NAME,
   MAX_CHARACTERS_PER_ACCOUNT,
} from 'shared';
import { state } from '../../state';
import { prisma } from '../../utils/prisma';
import { SocketId } from '../../utils/socketId';

export const handleCreateCharacter = async (
   { name }: ClientPacketType<'createCharacter'>,
   socketId: SocketId,
) => {
   const client = state.getClient(socketId);

   if (name === INTERNAL_PLAYER_NAME) {
      client.socket.send({
         type: 'createCharacterResponse',
         response: {
            status: 'error',
            errorMessage: 'This character name is reserved',
         },
      });
      return;
   }

   const characters = await prisma.character.findMany({
      where: { user: { username: client.username } },
   });

   if (characters.some((entry) => entry.name === name)) {
      client.socket.send({
         type: 'createCharacterResponse',
         response: {
            status: 'error',
            errorMessage: 'Character already exists',
         },
      });
      return;
   }

   if (characters.length >= MAX_CHARACTERS_PER_ACCOUNT) {
      client.socket.send({
         type: 'createCharacterResponse',
         response: {
            status: 'error',
            errorMessage: 'Maximum number of characters reached',
         },
      });
      return;
   }

   await prisma.character.create({
      data: {
         name,
         pos_x: DEFAULT_X,
         pos_y: DEFAULT_Y,
         map: DEFAULT_MAP,
         user: {
            connect: {
               username: client.username,
            },
         },
      },
   });

   client.socket.send({
      type: 'createCharacterResponse',
      response: {
         status: 'character_created',
         characters: [...characters.map((entry) => ({ name: entry.name })), { name }],
      },
   });
};
