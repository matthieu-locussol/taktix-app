import FastifyCorsPlugin from '@fastify/cors';
import FastifyWebSocketPlugin from '@fastify/websocket';
import Fastify from 'fastify';
import { statusRouter } from './routers/statusRouter';
import { wsRouter } from './routers/wsRouter';

const fastifyInstance = Fastify();

fastifyInstance.register(FastifyWebSocketPlugin);
fastifyInstance.register(FastifyCorsPlugin);

fastifyInstance.register(async (fastify) => {
   fastify.get('/ws', { websocket: true }, wsRouter);
   fastify.get('/status', statusRouter);
});

fastifyInstance.listen(
   {
      host: '0.0.0.0',
      port: Number.parseInt(process.env.PORT || '4000', 10),
   },
   (error) => {
      if (error) {
         fastifyInstance.log.error(error);
         process.exit(1);
      }
   },
);
