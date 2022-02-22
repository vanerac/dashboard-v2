import { ServiceUserData, SSOTools, Token } from '../types';
import axios from 'axios';
import configuration from '../../../configuration';

export class GoogleTools implements SSOTools {
    static clientId: string = configuration.googleClientId || '';
    static clientSecret: string = configuration.googleClientSecret || '';
    static callbackURL: string = configuration.googleRedirectUri || '';
    static scope: string = configuration.googleScopes || '';

    static async getToken(code: string, callbackURL: string): Promise<Token> {
        const params = {
            grant_type: 'authorization_code',
            code,
            client_id: GoogleTools.clientId,
            client_secret: GoogleTools.clientSecret,
            redirect_uri: callbackURL || GoogleTools.callbackURL,
        };
        console.log('la => ', params);
        const data = await axios.post(
            'https://www.googleapis.com/oauth2/v4/token?' + new URLSearchParams(params).toString(),
        );
        data.data.provider = 'google';
        return data.data;
    }

    static async refreshToken(refreshToken: string): Promise<Token> {
        const params = {
            client_id: GoogleTools.clientId,
            client_secret: GoogleTools.clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        };
        const data = await axios.post('https://www.googleapis.com/oauth2/v4/token', params);
        data.data.provider = 'google';
        return data.data;
    }

    static async getUserInfos(token: string): Promise<ServiceUserData> {
        const data = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            id: data.data.id,
            email: data.data.email,
            displayName: data.data.name,
            password: undefined,
        };
    }
}
