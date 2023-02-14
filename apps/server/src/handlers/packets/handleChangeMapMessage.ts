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

   state.clients.forEach((currentClient) => {
      if (currentClient.name !== client.name && currentClient.map === client.map) {
         currentClient.socket.send({
            type: 'playerLeaveMap',
            name: client.name,
         });
      }
   });

   client.setMap(map);
   client.setPosition(x, y);

   state.clients.forEach((currentClient) => {
      if (currentClient.name !== client.name && currentClient.map === client.map) {
         currentClient.socket.send({
            type: 'playerJoinMap',
            name: client.name,
            x,
            y,
         });
      }
   });

   state.clients.forEach((currentClient, currentSocketId) => {
      if (socketId !== currentSocketId && currentClient.map === client.map) {
         players.push({ nickname: currentClient.name, ...currentClient.position });
      }
   });

   return {
      type: 'changeMapResponse',
      players,
   };
};
