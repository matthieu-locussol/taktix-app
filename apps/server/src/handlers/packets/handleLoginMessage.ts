import { ClientPacketType, ServerPacket, _assert } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Player } from 'shared/src/types';
import { SOCKETS } from '../../globals';
import { prisma } from '../../utils/prisma';

export const handleLoginMessage = async (
   { name }: ClientPacketType<'login'>,
   socketId: string,
): Promise<ServerPacketType<'loginResponse'>> => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packetLoggedIn: ServerPacket = {
         type: 'playerLoggedIn',
         name,
      };

      SOCKETS.forEach(({ socket }, currentSocketId) => {
         if (currentSocketId !== socketId) {
            socket.send(JSON.stringify(packetLoggedIn));
         }
      });

      let user = await prisma.testo.findUnique({
         where: {
            name,
         },
      });

      if (user === null) {
         user = await prisma.testo.create({
            data: {
               name,
            },
         });
      }

      client.data.name = name;
      client.data.map = user.map;
      client.data.position = {
         x: user.pos_x,
         y: user.pos_y,
      };

      const packetJoinMap: ServerPacket = {
         type: 'playerJoinMap',
         name,
         x: user.pos_x,
         y: user.pos_y,
      };

      SOCKETS.forEach(({ socket, data: { map } }, currentSocketId) => {
         _assert(user);

         if (currentSocketId !== socketId && map === user.map) {
            socket.send(JSON.stringify(packetJoinMap));
         }
      });

      const players: Player[] = [...SOCKETS.values()]
         .filter(({ data }) => name !== data.name && data.map === client.data.map)
         .map(({ data }) => ({
            nickname: data.name,
            x: data.position.x,
            y: data.position.y,
         }));

      return {
         type: 'loginResponse',
         response: {
            status: 'connected',
            map: user.map,
            posX: user.pos_x,
            posY: user.pos_y,
            players,
         },
      };
   }

   return {
      type: 'loginResponse',
      response: {
         status: 'unknown',
      },
   };
};
