import { SocketStream } from '@fastify/websocket';
import { FastifyRequest } from 'fastify';
import { zClientPacket } from 'shared';
import { handleClientPacket } from '../handlers/handleClientPacket';
import { state } from '../state';
import { prisma } from '../utils/prisma';
import { makeSocketId } from '../utils/socketId';

export const wsRouter = (connection: SocketStream, request: FastifyRequest) => {
   const socketId = makeSocketId();

   if (request.socket.remoteAddress !== undefined) {
      request.log.info(`New connection from ${socketId}!`);
      state.initializeNewClient(socketId, connection.socket);
   }

   connection.socket.onclose = async () => {
      request.log.info(`Disconnected: ${socketId}`);
      const client = state.getClient(socketId);

      if (client.characterName === '') {
         return;
      }

      state.getOtherPlayers(socketId).forEach(({ socket }) => {
         socket.send({
            type: 'playerLoggedOut',
            name: client.characterName,
         });
      });

      state.getOtherPlayersSameMap(socketId).forEach(({ socket }) => {
         socket.send({
            type: 'playerLeaveMap',
            name: client.characterName,
         });
      });

      await prisma.character.update({
         data: {
            map: client.map,
            pos_x: client.position.x,
            pos_y: client.position.y,
         },
         where: {
            name: client.characterName,
         },
      });

      state.clients.delete(socketId);
   };

   connection.socket.onerror = (err) => {
      console.error(err.message);
   };

   connection.socket.onmessage = async (event) => {
      try {
         const packet = zClientPacket.parse(JSON.parse(event.data.toString()));
         request.log.info(`Received a ${packet.type} packet`);
         await handleClientPacket(packet, socketId);
      } catch (e) {
         console.error(e);
      }
   };
};
