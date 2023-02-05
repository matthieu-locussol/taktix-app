import { SocketStream } from '@fastify/websocket';
import { FastifyRequest } from 'fastify';
import { ServerPacket, zClientPacket } from 'shared';
import { v4 as uuidv4 } from 'uuid';
import { SOCKETS } from '../globals';
import { handleClientMessage } from '../handlers/handleClientMessage';
import { handleClientResponse } from '../handlers/handleClientResponse';

export const wsRouter = (connection: SocketStream, req: FastifyRequest) => {
   const socketId = uuidv4();

   if (req.socket.remoteAddress !== undefined) {
      console.log(`New connection from ${socketId}!`);

      SOCKETS.set(socketId, {
         name: '',
         socket: connection.socket,
      });
   }

   connection.socket.onclose = () => {
      if (req.socket.remoteAddress !== undefined) {
         console.log(`Disconnected: ${socketId}`);

         SOCKETS.delete(socketId);
      }
   };

   connection.socket.onerror = (err) => {
      console.error(err.message);
   };

   connection.socket.onmessage = (event) => {
      try {
         const { type, packet } = zClientPacket.parse(JSON.parse(event.data.toString()));

         switch (type) {
            case 'message': {
               const response = handleClientMessage(packet, socketId);
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
