import { ClientPacketType } from 'shared';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleMessage = (
   { content, name }: ClientPacketType<'message'>,
   socketId: SocketId,
): null => {
   const client = state.getClient(socketId);

   state.getOtherPlayers(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerMessage',
         name,
         content,
      });
   });

   client.socket.send({
      type: 'messageResponse',
   });

   return null;
};
