import { ClientPacketType } from 'shared';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleMove = ({ posX, posY }: ClientPacketType<'move'>, socketId: SocketId): null => {
   const client = state.getClient(socketId);
   client.setPosition(posX, posY);

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerMove',
         name: client.name,
         x: posX,
         y: posY,
      });
   });

   client.socket.send({
      type: 'moveResponse',
   });

   return null;
};
