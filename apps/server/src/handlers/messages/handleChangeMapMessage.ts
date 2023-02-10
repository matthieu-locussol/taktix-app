import { ChangeMapMessage, ChangeMapResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';

export const handleChangeMapMessage = (
   { map, x, y }: ChangeMapMessage,
   socketId: string,
): ChangeMapResponse => {
   const client = SOCKETS.get(socketId);
   const players: ChangeMapResponse['players'] = [];

   if (client !== undefined) {
      const packetLeave: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerLeaveMap',
            name: client.data.name,
         },
      };

      SOCKETS.forEach(({ socket, data }) => {
         if (data.name !== client.data.name && data.map === client.data.map) {
            socket.send(JSON.stringify(packetLeave));
         }
      });

      client.data.map = map;
      client.data.position.x = x;
      client.data.position.y = y;

      const packet: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerJoinMap',
            name: client.data.name,
            x,
            y,
         },
      };

      SOCKETS.forEach(({ socket, data }) => {
         if (data.name !== client.data.name && data.map === client.data.map) {
            socket.send(JSON.stringify(packet));
         }
      });

      SOCKETS.forEach(({ data }, currentSocketId) => {
         if (socketId !== currentSocketId && data.map === client.data.map) {
            players.push({
               name: data.name,
               posX: data.position.x,
               posY: data.position.y,
            });
         }
      });
   }

   return {
      type: 'changeMapResponse',
      players,
   };
};
