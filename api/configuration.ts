import dotenv from 'dotenv';

dotenv.config();

export default {
    // Google SSO Infos
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || '',
    googleScopes: process.env.GOOGLE_SCOPES || '',
    // Spotify SSO Infos
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID || '',
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI || '',
    spotifyScopes: process.env.SPOTIFY_SCOPES || '',
    // Deezer SSO Infos
    deezerClientId: process.env.DEEZER_CLIENT_ID || '',
    deezerClientSecret: process.env.DEEZER_CLIENT_SECRET || '',
    deezerRedirectUri: process.env.DEEZER_REDIRECT_URI || '',
    deezerScopes: process.env.DEEZER_SCOPES || '',
    // Last.fm SSO Infos
    lastfmClientId: process.env.LASTFM_CLIENT_ID || '',
    lastfmClientSecret: process.env.LASTFM_CLIENT_SECRET || '',
    lastfmRedirectUri: process.env.LASTFM_REDIRECT_URI || '',
    lastfmScopes: process.env.LASTFM_SCOPES || '',
    // Apple SSO Infos
    appleClientId: process.env.APPLE_CLIENT_ID || '',
    appleClientSecret: process.env.APPLE_CLIENT_SECRET || '',
    appleRedirectUri: process.env.APPLE_REDIRECT_URI || '',
    appleScopes: process.env.APPLE_SCOPES || '',

    // Database connection infos
    posgresHost: process.env.POSTGRES_HOST || '',
    posgresPort: process.env.POSTGRES_PORT || '',
    posgresUser: process.env.POSTGRES_USER || '',
    posgresPassword: process.env.POSTGRES_PASSWORD || '',
    posgresDatabase: process.env.POSTGRES_DATABASE || '',

    // Server connection infos
    serverPort: process.env.SERVER_PORT || 3000,
    serverHost: process.env.SERVER_HOST || '',
    frontendHost: process.env.FRONTEND_HOST || '',
    frontendPort: process.env.FRONTEND_PORT || '',

    // Security configuration
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
};
