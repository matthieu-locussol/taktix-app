import { LoginMessage, LoginResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';

export const handleLoginMessage = ({ data }: LoginMessage, socketId: string): LoginResponse => {
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

      SOCKETS.set(socketId, { ...client, name: data.name });

      SOCKETS.forEach(({ socket }, currentSocketId) => {
         if (currentSocketId !== socketId) {
            socket.send(JSON.stringify(packet));
         }
      });

      return {
         type: 'loginResponse',
         data: {
            response: 'connected',
         },
      };
   }

   return {
      type: 'loginResponse',
      data: {
         response: 'unknown',
      },
   };
};
