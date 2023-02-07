import { LoginMessage, LoginResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';
import { prisma } from '../../utils/prisma';

export const handleLoginMessage = async (
   { data }: LoginMessage,
   socketId: string,
): Promise<LoginResponse> => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packet: ServerPacket = {
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
            socket.send(JSON.stringify(packet));
         }
      });

      const user = await prisma.testo.findUnique({
         where: {
            name: data.name,
         },
      });

      if (user === null) {
         return {
            type: 'loginResponse',
            data: {
               response: {
                  status: 'unknown',
               },
            },
         };
      }

      client.data.name = data.name;
      client.data.position = {
         x: user.pos_x,
         y: user.pos_y,
      };

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
