import { MoveMessage, MoveResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';

export const handleMoveMessage = ({ posX, posY }: MoveMessage, socketId: string): MoveResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      client.data.position = {
         x: posX,
         y: posY,
      };

      const packet: ServerPacket = {
         type: 'playerMove',
         name: client.data.name,
         x: posX,
         y: posY,
      };

      SOCKETS.forEach(({ socket, data: { map, name } }) => {
         if (name !== client.data.name && map === client.data.map) {
            socket.send(JSON.stringify(packet));
         }
      });
   }

   return {
      type: 'moveResponse',
   };
};
