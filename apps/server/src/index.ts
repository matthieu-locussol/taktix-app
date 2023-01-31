import FastifyWebSocketPlugin from '@fastify/websocket';
import Fastify from 'fastify';
import { zClientMessage } from 'shared';
import { handleClientMessage } from './handleClientMessage';

const fastifyInstance = Fastify();

fastifyInstance.register(FastifyWebSocketPlugin);

fastifyInstance.register(async (fastify) => {
   fastify.get('/', { websocket: true }, (connection, req) => {
      console.log(`Connection from ${JSON.stringify(req.socket.address())}!`);

      connection.socket.onerror = (err) => {
         console.error(err.message);
      };

      connection.socket.onmessage = (event) => {
         try {
            const data = zClientMessage.parse(JSON.parse(event.data.toString()));
            const response = handleClientMessage(data);
            connection.socket.send(JSON.stringify(response));
         } catch (e) {
            console.error(e);
         }
      };

      connection.socket.onclose = () => {
         console.log('Connection closed.');
      };
   });
});

fastifyInstance.listen({ port: 3000 }, (error) => {
   if (error) {
      fastifyInstance.log.error(error);
      process.exit(1);
   }
});
