import { google } from 'googleapis';

export function createGoogleOAuth2Client () {
  const clientId = process.env.GOOGLE_API_CLIENT_ID || "9999-xxxx.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_API_SECRET || "xxxxxxxx";
  const redirectUri = process.env.GOOGLE_API_REDIRECT_URI || "https://gold-apple-sugar.herokuapp.com";
  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  return client;
}

