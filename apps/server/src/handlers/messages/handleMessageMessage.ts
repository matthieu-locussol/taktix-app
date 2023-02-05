import { MessageMessage, MessageResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';

export const handleMessageMessage = (
   { data }: MessageMessage,
   socketId: string,
): MessageResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packet: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerMessage',
            data: {
               name: data.name,
               content: data.content,
            },
         },
      };

      SOCKETS.forEach(({ socket }, currentSocketId) => {
         if (currentSocketId !== socketId) {
            socket.send(JSON.stringify(packet));
         }
      });
   }

   return {
      type: 'messageResponse',
      data: null,
   };
};
