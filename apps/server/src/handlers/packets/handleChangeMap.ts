import { ClientPacketType } from 'shared';
import { Player } from 'shared/src/types';
import { state } from '../../state';
import { SocketId } from '../../utils/socketId';

export const handleChangeMap = (
   { map, x, y }: ClientPacketType<'changeMap'>,
   socketId: SocketId,
): null => {
   const client = state.getClient(socketId);
   const players: Player[] = [];

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerLeaveMap',
         name: client.name,
      });
   });

   client.setMap(map);
   client.setPosition(x, y);

   state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
      socket.send({
         type: 'playerJoinMap',
         name: client.name,
         x,
         y,
      });
   });

   state.getOtherPlayersSameMap(socketId).forEach(({ name, position }) => {
      players.push({ nickname: name, ...position });
   });

   client.socket.send({
      type: 'changeMapResponse',
      players,
   });

   return null;
};
