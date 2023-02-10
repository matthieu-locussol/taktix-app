import { ServerPacket } from 'shared/src/client/ServerPacket';
import { LogoutResponse } from 'shared/src/client/schemas/responses/LogoutResponse';
import { LogoutMessage } from 'shared/src/server/schemas/messages/LogoutMessage';
import { SOCKETS } from '../../globals';

export const handleLogoutMessage = ({ data }: LogoutMessage, socketId: string): LogoutResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packet: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerLoggedOut',
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

      return {
         type: 'logoutResponse',
         data: {
            response: 'success',
         },
      };
   }

   return {
      type: 'logoutResponse',
      data: {
         response: 'unknown',
      },
   };
};
