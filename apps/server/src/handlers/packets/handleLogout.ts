import { ClientPacketType } from 'shared';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleLogout = ({ name }: ClientPacketType<'logout'>, socketId: SocketId): null => {
   const client = state.getClient(socketId);

   state.getOtherPlayers(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerLoggedOut',
         name,
      });
   });

   client.socket.send({
      type: 'logoutResponse',
      response: 'success',
   });

   return null;
};
