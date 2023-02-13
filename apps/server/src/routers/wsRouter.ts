import { SocketStream } from '@fastify/websocket';
import { FastifyRequest } from 'fastify';
import { _assertTrue, isServerPacket, zClientPacket } from 'shared';
import { handleClientPacket } from '../handlers/handleClientPacket';
import { state } from '../state';
import { prisma } from '../utils/prisma';
import { makeSocketId } from '../utils/socketId';

export const wsRouter = (connection: SocketStream, req: FastifyRequest) => {
   const socketId = makeSocketId();

   if (req.socket.remoteAddress !== undefined) {
      console.log(`New connection from ${socketId}!`);
      state.initializeNewClient(socketId, connection.socket);
   }

   connection.socket.onclose = async () => {
      console.log(`Disconnected: ${socketId}`);
      const client = state.getClient(socketId);

      state.getOtherClients(socketId).forEach(({ socket, data: { map } }) => {
         socket.send({
            type: 'playerLoggedOut',
            name: client.data.name,
         });

         if (client.data.map === map) {
            socket.send({
               type: 'playerLeaveMap',
               name: client.data.name,
            });
         }
      });

      await prisma.testo.update({
         data: {
            map: client.data.map,
            pos_x: client.data.position.x,
            pos_y: client.data.position.y,
         },
         where: {
            name: client.data.name,
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
         const response = await handleClientPacket(packet, socketId);

         if (response !== null) {
            _assertTrue(isServerPacket(response));
            console.log(`Sending a ${response.type} packet...`);
            connection.socket.send(JSON.stringify(response));
         }
      } catch (e) {
         console.error(e);
      }
   };
};
