import { FastifyReply, FastifyRequest } from 'fastify';

export const statusRouter = (_: FastifyRequest, res: FastifyReply) => {
   res.send({ status: 'ok' });
};
