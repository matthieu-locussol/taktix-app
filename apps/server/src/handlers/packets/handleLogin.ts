import crypto from 'crypto';
import { ClientPacketType, _assertTrue } from 'shared';
import { Player } from 'shared/dist/types/Player';
import { state } from '../../state';
import { prisma } from '../../utils/prisma';
import { SocketId } from '../../utils/socketId';

export const handleLogin = async (
   { username, password }: ClientPacketType<'login'>,
   socketId: SocketId,
) => {
   const client = state.getClient(socketId);

   // TODO: Should be checked in "handleRegister"

   // if (name === INTERNAL_PLAYER_NAME) {
   //    client.socket.send({
   //       type: 'loginResponse',
   //       response: {
   //          status: 'user_already_exist',
   //       },
   //    });
   //    return;
   // }

   // Hash password using bcrypt with the new JS Crypto API
   const digestPassword = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
   const hashedPassword = Array.from(new Uint8Array(digestPassword))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

   const users = await prisma.user.findMany({
      where: { username, password: hashedPassword },
      include: { characters: true },
   });
   _assertTrue(users.length <= 1, 'More than one user found!');
   const user = users[0];

   if (!user) {
      client.socket.send({
         type: 'loginResponse',
         response: {
            status: 'user_not_found',
         },
      });
      return;
   }

   _assertTrue(user.characters.length > 0, 'User has no characters!');
   const character = user.characters[0];

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerLoggedIn',
         name: character.name,
      });
   });

   client.name = character.name;
   client.map = character.map;
   client.position = {
      x: character.pos_x,
      y: character.pos_y,
   };

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerJoinMap',
         name: character.name,
         x: character.pos_x,
         y: character.pos_y,
      });
   });

   const players: Player[] = state.getOtherPlayersSameMap(socketId).map((player) => ({
      nickname: player.name,
      x: player.position.x,
      y: player.position.y,
   }));

   client.socket.send({
      type: 'loginResponse',
      response: {
         status: 'connected',
         map: character.map,
         posX: character.pos_x,
         posY: character.pos_y,
         players,
      },
   });
};
