import fs from 'fs';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

const server: FastifyInstance = Fastify({});

server.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' };
});

server.get('/', (request, reply) => {
  const stream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  reply.send(stream);
});

server.listen({ port: parseInt(process.env.PORT || "3000"), host: "0.0.0.0" });
