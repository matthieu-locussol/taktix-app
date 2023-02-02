import FastifyWebSocketPlugin from '@fastify/websocket';
import Fastify from 'fastify';
import { statusRouter } from './routers/statusRouter';
import { wsRouter } from './routers/wsRouter';

const fastifyInstance = Fastify();

fastifyInstance.register(FastifyWebSocketPlugin);

fastifyInstance.register(async (fastify) => {
   fastify.get('/ws', { websocket: true }, wsRouter);
   fastify.get('/status', statusRouter);
});

fastifyInstance.listen({ port: 4000 }, (error) => {
   if (error) {
      fastifyInstance.log.error(error);
      process.exit(1);
   }
});
