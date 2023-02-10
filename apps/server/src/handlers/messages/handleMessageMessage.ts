import { MessageMessage, MessageResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';

export const handleMessageMessage = (
   { content, name }: MessageMessage,
   socketId: string,
): MessageResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packet: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerMessage',
            name,
            content,
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
   };
};
