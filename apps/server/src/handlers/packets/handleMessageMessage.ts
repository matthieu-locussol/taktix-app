import { ClientPacketType, ServerPacket } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { SOCKETS } from '../../globals';

export const handleMessageMessage = (
   { content, name }: ClientPacketType<'message'>,
   socketId: string,
): ServerPacketType<'messageResponse'> => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      const packet: ServerPacket = {
         type: 'playerMessage',
         name,
         content,
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
