import FastifyWebSocketPlugin from '@fastify/websocket';
import Fastify from 'fastify';
import { ServerPacket, zClientPacket } from 'shared';
import { handleClientMessage } from './handleClientMessage';
import { handleClientResponse } from './handleClientResponse';

const sockets = new Map<string, NodeJS.Timeout>();

const fastifyInstance = Fastify();

fastifyInstance.register(FastifyWebSocketPlugin);

fastifyInstance.register(async (fastify) => {
   fastify.get('/', { websocket: true }, (connection, req) => {
      console.log(`Connection from ${JSON.stringify(req.socket.address())}!`);

      if (req.socket.remoteAddress !== undefined) {
         const timeoutId = setInterval(() => {
            const payload: ServerPacket = {
               type: 'message',
               packet: {
                  type: 'ping',
                  data: {
                     message: 'Ping...',
                  },
               },
            };

            connection.socket.send(JSON.stringify(payload));
         }, 5000);

         sockets.set(req.socket.remoteAddress, timeoutId);
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
            const timeoutId = sockets.get(req.socket.remoteAddress);
            clearTimeout(timeoutId);
            sockets.delete(req.socket.remoteAddress);
         }
      };
   });
});

fastifyInstance.listen({ port: 3000 }, (error) => {
   if (error) {
      fastifyInstance.log.error(error);
      process.exit(1);
   }
});
