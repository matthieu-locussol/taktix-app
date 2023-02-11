import { SocketStream } from '@fastify/websocket';
import { FastifyRequest } from 'fastify';
import { ServerPacket, _assertTrue, isServerPacket, zClientPacket } from 'shared';
import { v4 as uuidv4 } from 'uuid';
import { SOCKETS } from '../globals';
import { handleClientPacket } from '../handlers/handleClientPacket';
import { prisma } from '../utils/prisma';

export const wsRouter = (connection: SocketStream, req: FastifyRequest) => {
   const socketId = uuidv4();

   if (req.socket.remoteAddress !== undefined) {
      console.log(`New connection from ${socketId}!`);

      SOCKETS.set(socketId, {
         data: {
            name: '',
            map: '',
            position: {
               x: 0,
               y: 0,
            },
         },
         socket: connection.socket,
      });
   }

   connection.socket.onclose = async () => {
      if (req.socket.remoteAddress !== undefined) {
         console.log(`Disconnected: ${socketId}`);

         const client = SOCKETS.get(socketId);

         if (client !== undefined) {
            SOCKETS.forEach(({ socket, data: { map } }, currentSocketId) => {
               if (currentSocketId !== socketId) {
                  const packetLoggedOut: ServerPacket = {
                     type: 'playerLoggedOut',
                     name: client.data.name,
                  };

                  socket.send(JSON.stringify(packetLoggedOut));

                  if (client.data.map === map) {
                     const packetLeaveMap: ServerPacket = {
                        type: 'playerLeaveMap',
                        name: client.data.name,
                     };

                     socket.send(JSON.stringify(packetLeaveMap));
                  }
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

            SOCKETS.delete(socketId);
         }
      }
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
