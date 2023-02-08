import { ChangeMapMessage, ChangeMapResponse } from 'shared';
import { SOCKETS } from '../../globals';

export const handleChangeMapMessage = (
   { data }: ChangeMapMessage,
   socketId: string,
): ChangeMapResponse => {
   const client = SOCKETS.get(socketId);

   if (client !== undefined) {
      client.data.map = data.map;

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
      type: 'changeMapResponse',
      data: null,
   };
};
