import { ClientPacketType } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleMessageMessage = (
   { content, name }: ClientPacketType<'message'>,
   socketId: SocketId,
): ServerPacketType<'messageResponse'> => {
   state.getOtherPlayers(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerMessage',
         name,
         content,
      });
   });

   return {
      type: 'messageResponse',
   };
};
