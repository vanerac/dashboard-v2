import { ServiceUserData, SSOTools, Token } from '../types';
import axios from 'axios';
import configuration from '../../../configuration';
import * as querystring from 'querystring';

export class SpotifyTools implements SSOTools {
    static clientId: string = configuration.spotifyClientId;
    static clientSecret: string = configuration.spotifyClientSecret;
    static callbackURL: string = configuration.spotifyRedirectUri;
    static scope: string = configuration.spotifyScopes;

    static async getToken(code: string): Promise<Token> {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: SpotifyTools.callbackURL,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${SpotifyTools.clientId}:${SpotifyTools.clientSecret}`).toString(
                    'base64',
                )}`,
            },
        });
        response.data.provider = 'spotify';
        return response.data;
    }

    static async refreshToken(refreshToken: string): Promise<Token> {
        const response = await axios.post('https://accounts.spotify.com/api/token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: SpotifyTools.clientId,
            client_secret: SpotifyTools.clientSecret,
        });
        return response.data;
    }

    static async getUserInfos(token: string): Promise<ServiceUserData> {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            id: response.data.id,
            displayName: response.data.display_name,
            email: response.data.email,
            password: undefined,
        };
    }
}
