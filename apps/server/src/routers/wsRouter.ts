import { SocketStream } from '@fastify/websocket';
import { FastifyRequest } from 'fastify';
import { ServerPacket, zClientPacket } from 'shared';
import { v4 as uuidv4 } from 'uuid';
import { SOCKETS } from '../globals';
import { handleClientMessage } from '../handlers/handleClientMessage';
import { handleClientResponse } from '../handlers/handleClientResponse';
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
                     type: 'message',
                     packet: {
                        type: 'playerLoggedOut',
                        data: {
                           name: client.data.name,
                        },
                     },
                  };

                  socket.send(JSON.stringify(packetLoggedOut));

                  if (client.data.map === map) {
                     const packetLeaveMap: ServerPacket = {
                        type: 'message',
                        packet: {
                           type: 'playerLeaveMap',
                           data: {
                              name: client.data.name,
                           },
                        },
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
         const { type, packet } = zClientPacket.parse(JSON.parse(event.data.toString()));

         switch (type) {
            case 'message': {
               const response = await handleClientMessage(packet, socketId);
               const payload: ServerPacket = {
                  type: 'response',
                  packet: response,
               };
               console.log(`Sending a ${payload.packet.type} response...`);
               connection.socket.send(JSON.stringify(payload));
               break;
            }
            case 'response': {
               handleClientResponse(packet, socketId);
               break;
            }
            default:
               throw new Error(`Unknown ClientPacket type: "${type}"`);
         }
      } catch (e) {
         console.error(e);
      }
   };
};
