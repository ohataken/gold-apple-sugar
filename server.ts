import fs from 'fs';
import crypto from 'crypto';
import { google } from 'googleapis';
import { createGoogleOAuth2Client, getGoogleOAuth2Scopes } from './lib/google_oauth2_client';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import FastifyRedis from '@fastify/redis';

const server: FastifyInstance = Fastify({});

server.register(FastifyRedis, {
  url: process.env.REDIS_URL
});

server.get('/oauth2/redirect', (request, reply) => {
  const client = createGoogleOAuth2Client();
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: getGoogleOAuth2Scopes(),
  });

  reply.redirect(302, url);
});

server.get('/oauth2/callback', async (request, reply) => {
  const query = request.query as any;
  const client = createGoogleOAuth2Client();
  const { tokens } = await client.getToken(query.code);
  const { redis } = server;
  const key = crypto.randomBytes(16).toString("hex");

  client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    version: 'v2',
    auth: client,
  });

  const userinfo = await oauth2.userinfo.get({});

  console.log(userinfo.data);

  const hash = {
    id: userinfo.data.id || "",
    email: userinfo.data.email || "",
    access_token: tokens.access_token || "",
    id_token: tokens.id_token || "",
  };

  await new Promise((resolve, reject) => {
    return redis.hset(key, hash, (err, val) => {
      return err ? reject(err) : resolve(val);
    });
  });

  return "hogehoge";
});

server.get('/', (request, reply) => {
  const stream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  reply.send(stream);
});

server.listen({ port: parseInt(process.env.PORT || "3000"), host: "0.0.0.0" });
