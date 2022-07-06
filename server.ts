import fs from 'fs';
import { createGoogleOAuth2Client, getGoogleOAuth2Scopes } from './lib/google_oauth2_client';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

const server: FastifyInstance = Fastify({});

server.get('/oauth2/redirect', (request, reply) => {
  const client = createGoogleOAuth2Client();
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: getGoogleOAuth2Scopes(),
  });

  reply.redirect(302, url);
});

server.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' };
});

server.get('/', (request, reply) => {
  const stream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  reply.send(stream);
});

server.listen({ port: parseInt(process.env.PORT || "3000"), host: "0.0.0.0" });
