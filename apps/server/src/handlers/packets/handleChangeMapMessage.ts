import { ClientPacketType } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Player } from 'shared/src/types';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleChangeMapMessage = (
   { map, x, y }: ClientPacketType<'changeMap'>,
   socketId: SocketId,
): ServerPacketType<'changeMapResponse'> => {
   const client = state.getClient(socketId);
   const players: Player[] = [];

   state.clients.forEach(({ socket, data }) => {
      if (data.name !== client.data.name && data.map === client.data.map) {
         socket.send({
            type: 'playerLeaveMap',
            name: client.data.name,
         });
      }
   });

   client.data.map = map;
   client.data.position.x = x;
   client.data.position.y = y;

   state.clients.forEach(({ socket, data }) => {
      if (data.name !== client.data.name && data.map === client.data.map) {
         socket.send({
            type: 'playerJoinMap',
            name: client.data.name,
            x,
            y,
         });
      }
   });

   state.clients.forEach(({ data }, currentSocketId) => {
      if (socketId !== currentSocketId && data.map === client.data.map) {
         players.push({ nickname: data.name, ...data.position });
      }
   });

   return {
      type: 'changeMapResponse',
      players,
   };
};
