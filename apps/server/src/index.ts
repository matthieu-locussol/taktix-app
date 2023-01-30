import FastifyWebSocketPlugin from '@fastify/websocket';
import Fastify from 'fastify';
import { zSocketSchema } from 'shared';
import { handleSocketData } from './handleSocketData';

const fastifyInstance = Fastify();

fastifyInstance.register(FastifyWebSocketPlugin);

fastifyInstance.register(async (fastify) => {
   fastify.get('/', { websocket: true }, (connection, req) => {
      console.log(`Connection from ${JSON.stringify(req.socket.address())}!`);

      connection.socket.onerror = (err) => console.error(err.message);

      connection.socket.onmessage = (event) => {
         try {
            const socketData = zSocketSchema.parse(JSON.parse(event.data.toString()));
            const response = handleSocketData(socketData);
            connection.socket.send(response);
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
