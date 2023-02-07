import { MoveMessage, MoveResponse } from 'shared';
import { SOCKETS } from '../../globals';

export const handleMoveMessage = ({ data }: MoveMessage, socketId: string): MoveResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      client.data.position = {
         x: data.posX,
         y: data.posY,
      };

      // const packet: ServerPacket = {
      //    type: 'message',
      //    packet: {
      //       type: '',
      //       data: {
      //          name: data.name,
      //          content: data.content,
      //       },
      //    },
      // };

      // SOCKETS.forEach(({ socket }, currentSocketId) => {
      //    if (currentSocketId !== socketId) {
      //       socket.send(JSON.stringify(packet));
      //    }
      // });
   }

   return {
      type: 'moveResponse',
      data: null,
   };
};
