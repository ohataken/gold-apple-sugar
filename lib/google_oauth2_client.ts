import { google } from 'googleapis';

export function createGoogleOAuth2Client () {
  const clientId = process.env.GOOGLE_API_CLIENT_ID || "9999-xxxx.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_API_SECRET || "xxxxxxxx";
  const redirectUri = process.env.GOOGLE_API_REDIRECT_URI || "https://gold-apple-sugar.herokuapp.com";

  // https://github.com/googleapis/google-auth-library-nodejs
  // https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest#oauth2
  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  return client;
}

export function getGoogleOAuth2Scopes () {
  return [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/script.projects',
    'https://www.googleapis.com/auth/script.metrics',
    'https://www.googleapis.com/auth/script.deployments',
    'https://www.googleapis.com/auth/script.processes',
  ];
}
