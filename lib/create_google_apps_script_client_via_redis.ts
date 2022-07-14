import { google } from 'googleapis';
import { FastifyRedis } from '@fastify/redis';
import { createGoogleOAuth2Client } from './google_oauth2_client';

export async function createGoogleAppsScriptClientViaRedis(redis: FastifyRedis, key: string) {
  const hash: any = await new Promise((resolve, reject) => {
    return redis.hgetall(key, (err, val) => {
      return err ? reject(err) : resolve(val);
    });
  });

  const client = createGoogleOAuth2Client();

  client.setCredentials({
    access_token: hash.access_token,
    id_token: hash.id_token,
  });

  const script = google.script({ version: 'v1', auth: client });

  return script;
}
