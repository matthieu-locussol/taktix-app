import { ClientPacketType } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleMoveMessage = (
   { posX, posY }: ClientPacketType<'move'>,
   socketId: SocketId,
): ServerPacketType<'moveResponse'> => {
   const client = state.getClient(socketId);
   client.setPosition(posX, posY);

   state.clients.forEach(({ socket, map, name }) => {
      if (name !== client.name && map === client.map) {
         socket.send({
            type: 'playerMove',
            name: client.name,
            x: posX,
            y: posY,
         });
      }
   });

   return {
      type: 'moveResponse',
   };
};
