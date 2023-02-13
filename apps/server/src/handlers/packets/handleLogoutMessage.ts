import { ClientPacketType, ServerPacket } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { SOCKETS } from '../../globals';

export const handleLogoutMessage = (
   { name }: ClientPacketType<'logout'>,
   socketId: string,
): ServerPacketType<'logoutResponse'> => {
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
