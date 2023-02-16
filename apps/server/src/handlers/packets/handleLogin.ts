import { ClientPacketType } from 'shared';
import { INTERNAL_PLAYER_NAME, Player } from 'shared/src/types/Player';
import { state } from '../../state';
import { prisma } from '../../utils/prisma';
import { SocketId } from '../../utils/socketId';

export const handleLogin = async ({ name }: ClientPacketType<'login'>, socketId: SocketId) => {
   const client = state.getClient(socketId);

   if (name === INTERNAL_PLAYER_NAME) {
      client.socket.send({
         type: 'loginResponse',
         response: {
            status: 'already_exist',
         },
      });
   }

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerLoggedIn',
         name,
      });
   });

   const user = await prisma.testo.upsert({
      where: { name },
      create: { name },
      update: {},
   });

   client.name = name;
   client.map = user.map;
   client.position = {
      x: user.pos_x,
      y: user.pos_y,
   };

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerJoinMap',
         name,
         x: user.pos_x,
         y: user.pos_y,
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
         map: user.map,
         posX: user.pos_x,
         posY: user.pos_y,
         players,
      },
   });
};
