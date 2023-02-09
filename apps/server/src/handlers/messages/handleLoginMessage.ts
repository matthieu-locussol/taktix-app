import { LoginMessage, LoginResponse, ServerPacket, _assert } from 'shared';
import { SOCKETS } from '../../globals';
import { prisma } from '../../utils/prisma';

export const handleLoginMessage = async (
   { data }: LoginMessage,
   socketId: string,
): Promise<LoginResponse> => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packetLoggedIn: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerLoggedIn',
            data: {
               name: data.name,
            },
         },
      };

      SOCKETS.forEach(({ socket }, currentSocketId) => {
         if (currentSocketId !== socketId) {
            socket.send(JSON.stringify(packetLoggedIn));
         }
      });

      let user = await prisma.testo.findUnique({
         where: {
            name: data.name,
         },
      });

      if (user === null) {
         user = await prisma.testo.create({
            data: {
               name: data.name,
            },
         });
      }

      client.data.name = data.name;
      client.data.map = user.map;
      client.data.position = {
         x: user.pos_x,
         y: user.pos_y,
      };

      const packetJoinMap: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerJoinMap',
            data: {
               name: data.name,
               map: user.map,
               x: user.pos_x,
               y: user.pos_y,
            },
         },
      };

      SOCKETS.forEach(({ socket, data: { map } }, currentSocketId) => {
         _assert(user);

         if (currentSocketId !== socketId && map === user.map) {
            socket.send(JSON.stringify(packetJoinMap));
         }
      });

      return {
         type: 'loginResponse',
         data: {
            response: {
               status: 'connected',
               map: user.map,
               posX: user.pos_x,
               posY: user.pos_y,
            },
         },
      };
   }

   return {
      type: 'loginResponse',
      data: {
         response: {
            status: 'unknown',
         },
      },
   };
};
