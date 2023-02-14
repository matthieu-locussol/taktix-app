import { ClientPacketType } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleLogoutMessage = (
   { name }: ClientPacketType<'logout'>,
   socketId: SocketId,
): ServerPacketType<'logoutResponse'> => {
   state.getOtherPlayers(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerLoggedOut',
         name,
      });
   });

   return {
      type: 'logoutResponse',
      response: 'success',
   };
};
