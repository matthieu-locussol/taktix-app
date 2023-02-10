import { ServerPacket } from 'shared/src/client/ServerPacket';
import { MoveResponse } from 'shared/src/client/schemas/responses/MoveResponse';
import { MoveMessage } from 'shared/src/server/schemas/messages/MoveMessage';
import { SOCKETS } from '../../globals';

export const handleMoveMessage = ({ data }: MoveMessage, socketId: string): MoveResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      client.data.position = {
         x: data.posX,
         y: data.posY,
      };

      const packet: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerMove',
            data: {
               name: client.data.name,
               x: data.posX,
               y: data.posY,
            },
         },
      };

      SOCKETS.forEach(({ socket, data: { map, name } }) => {
         if (name !== client.data.name && map === client.data.map) {
            socket.send(JSON.stringify(packet));
         }
      });
   }

   return {
      type: 'moveResponse',
      data: null,
   };
};
