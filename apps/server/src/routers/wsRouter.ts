import { SocketStream } from '@fastify/websocket';
import { FastifyRequest } from 'fastify';
import { ServerPacket, zClientPacket } from 'shared';
import { SOCKETS } from '../globals';
import { handleClientMessage } from '../handlers/handleClientMessage';
import { handleClientResponse } from '../handlers/handleClientResponse';

export const wsRouter = (connection: SocketStream, req: FastifyRequest) => {
   console.log(`Connection from ${JSON.stringify(req.socket.address())}!`);

   if (req.socket.remoteAddress !== undefined) {
      const timeoutId = setInterval(() => {
         console.log('fired');

         const payload: ServerPacket = {
            type: 'message',
            packet: {
               type: 'ping',
               data: {
                  message: 'PingMessage...',
               },
            },
         };

         connection.socket.send(JSON.stringify(payload));
      }, 5000);

      SOCKETS.set(req.socket.remoteAddress, timeoutId);
   }

   connection.socket.onerror = (err) => {
      console.error(err.message);
   };

   connection.socket.onmessage = (event) => {
      try {
         const { type, packet } = zClientPacket.parse(JSON.parse(event.data.toString()));

         switch (type) {
            case 'message': {
               const response = handleClientMessage(packet);
               const payload: ServerPacket = {
                  type: 'response',
                  packet: response,
               };
               connection.socket.send(JSON.stringify(payload));
               break;
            }
            case 'response': {
               handleClientResponse(packet);
               break;
            }
            default:
               throw new Error(`Unknown ClientPacket type: "${type}"`);
         }
      } catch (e) {
         console.error(e);
      }
   };

   connection.socket.onclose = () => {
      console.log('Connection closed.');

      if (req.socket.remoteAddress !== undefined) {
         const timeoutId = SOCKETS.get(req.socket.remoteAddress);
         clearInterval(timeoutId);
         SOCKETS.delete(req.socket.remoteAddress);
      }
   };
};
