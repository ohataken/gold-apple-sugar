import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

const server: FastifyInstance = Fastify({});

server.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' };
});

server.listen({ port: parseInt(process.env.PORT || "3000") });
