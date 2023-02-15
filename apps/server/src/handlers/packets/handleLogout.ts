import { ClientPacketType } from 'shared';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleLogout = ({ name }: ClientPacketType<'logout'>, socketId: SocketId) => {
   state.getOtherPlayers(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerLoggedOut',
         name,
      });
   });
};
