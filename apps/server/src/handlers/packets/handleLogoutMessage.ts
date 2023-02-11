import { LogoutMessage, LogoutResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';

export const handleLogoutMessage = ({ name }: LogoutMessage, socketId: string): LogoutResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packet: ServerPacket = {
         type: 'playerLoggedOut',
         name,
      };

      SOCKETS.forEach(({ socket }, currentSocketId) => {
         if (currentSocketId !== socketId) {
            socket.send(JSON.stringify(packet));
         }
      });

      return {
         type: 'logoutResponse',
         response: 'success',
      };
   }

   return {
      type: 'logoutResponse',
      response: 'unknown',
   };
};
