import { ClientPacketType, ServerPacket } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { SOCKETS } from '../../globals';

export const handleChangeMapMessage = (
   { map, x, y }: ClientPacketType<'changeMap'>,
   socketId: string,
): ServerPacketType<'changeMapResponse'> => {
   const client = SOCKETS.get(socketId);
   const players: ServerPacketType<'changeMapResponse'>['players'] = [];

   if (client !== undefined) {
      const packetLeave: ServerPacket = {
         type: 'playerLeaveMap',
         name: client.data.name,
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
         type: 'playerJoinMap',
         name: client.data.name,
         x,
         y,
      };

      SOCKETS.forEach(({ socket, data }) => {
         if (data.name !== client.data.name && data.map === client.data.map) {
            socket.send(JSON.stringify(packet));
         }
      });

      SOCKETS.forEach(({ data }, currentSocketId) => {
         if (socketId !== currentSocketId && data.map === client.data.map) {
            players.push({
               nickname: data.name,
               x: data.position.x,
               y: data.position.y,
            });
         }
      });
   }

   return {
      type: 'changeMapResponse',
      players,
   };
};
