import FastifyCorsPlugin from '@fastify/cors';
import FastifyWebSocketPlugin from '@fastify/websocket';
import Fastify from 'fastify';
import { registerRouter } from './routers/registerRouter';
import { statusRouter } from './routers/statusRouter';
import { wsRouter } from './routers/wsRouter';

const fastifyInstance = Fastify({
   logger: process.env.NODE_ENV !== 'production',
});

fastifyInstance.register(FastifyWebSocketPlugin);
fastifyInstance.register(FastifyCorsPlugin, {
   origin: '*',
   methods: ['GET'],
   credentials: true,
});

fastifyInstance.register(async (fastify) => {
   fastify.get('/ws', { websocket: true }, wsRouter);
   fastify.get('/status', statusRouter);
   fastify.post('/register', registerRouter);
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
