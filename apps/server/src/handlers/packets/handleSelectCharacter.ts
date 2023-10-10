import { ClientPacketType } from 'shared';
import { Player } from 'shared/dist/types/Player';
import { state } from '../../state';
import { prisma } from '../../utils/prisma';
import { SocketId } from '../../utils/socketId';

export const handleSelectCharacter = async (
   { name }: ClientPacketType<'selectCharacter'>,
   socketId: SocketId,
) => {
   const client = state.getClient(socketId);

   const character = await prisma.character.findUnique({
      where: { name },
      include: { user: true },
   });

   if (!character) {
      client.socket.send({
         type: 'selectCharacterResponse',
         response: {
            status: 'error',
            errorMessage: `Character "${name}" does not exist!`,
         },
      });
      return;
   }

   if (character.user.username !== client.username) {
      client.socket.send({
         type: 'selectCharacterResponse',
         response: {
            status: 'error',
            errorMessage: `Character "${name}" does not belong to user "${client.username}"!`,
         },
      });
      return;
   }

   client.map = character.map;
   client.characterName = character.name;
   client.position = {
      x: character.pos_x,
      y: character.pos_y,
   };

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerLoggedIn',
         name: character.name,
      });
   });

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerJoinMap',
         name: character.name,
         x: character.pos_x,
         y: character.pos_y,
      });
   });

   const players: Player[] = state.getOtherPlayersSameMap(socketId).map((player) => ({
      nickname: player.characterName,
      x: player.position.x,
      y: player.position.y,
   }));

   client.socket.send({
      type: 'selectCharacterResponse',
      response: {
         status: 'connected',
         name: character.name,
         map: character.map,
         posX: character.pos_x,
         posY: character.pos_y,
         players,
      },
   });
};
