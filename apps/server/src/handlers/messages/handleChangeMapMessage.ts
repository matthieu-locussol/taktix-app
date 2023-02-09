import { ChangeMapMessage, ChangeMapResponse, ServerPacket } from 'shared';
import { SOCKETS } from '../../globals';

export const handleChangeMapMessage = (
   { data }: ChangeMapMessage,
   socketId: string,
): ChangeMapResponse => {
   const client = SOCKETS.get(socketId);
   const players: ChangeMapResponse['data']['players'] = [];

   if (client !== undefined) {
      const packetLeave: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerLeaveMap',
            data: {
               name: client.data.name,
            },
         },
      };

      SOCKETS.forEach(({ socket, data: { map } }, currentSocketId) => {
         if (currentSocketId !== socketId && map === client.data.map) {
            socket.send(JSON.stringify(packetLeave));
         }
      });

      client.data.map = data.map;
      client.data.position.x = data.x;
      client.data.position.y = data.y;

      const packet: ServerPacket = {
         type: 'message',
         packet: {
            type: 'playerJoinMap',
            data: {
               name: client.data.name,
               x: data.x,
               y: data.y,
            },
         },
      };

      SOCKETS.forEach(({ socket, data: { map } }, currentSocketId) => {
         if (currentSocketId !== socketId && map === client.data.map) {
            socket.send(JSON.stringify(packet));
         }
      });

      SOCKETS.forEach(
         (
            {
               data: {
                  name,
                  position: { x, y },
                  map,
               },
            },
            currentSocketId,
         ) => {
            if (socketId !== currentSocketId && map === client.data.map) {
               players.push({
                  name,
                  posX: x,
                  posY: y,
               });
            }
         },
      );
   }

   return {
      type: 'changeMapResponse',
      data: {
         players,
      },
   };
};
