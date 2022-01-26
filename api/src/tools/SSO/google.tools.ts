import { SSOTools, Token } from '../types';
import axios from 'axios';

export class GoogleTools implements SSOTools {
    static clientId: string = process.env.GOOGLE_CLIENT_ID || '';
    static clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || '';
    static callbackURL: string = process.env.GOOGLE_CALLBACK_URI || '';
    static scope: string = process.env.GOOGLE_SCOPE || '';
    static state: string = process.env.GOOGLE_STATE || '';

    static async getToken(code: string): Promise<Token> {
        const params = {
            code,
            client_id: GoogleTools.clientId,
            client_secret: GoogleTools.clientSecret,
            redirect_uri: GoogleTools.callbackURL,
            grant_type: 'authorization_code',
        };
        const data = await axios.post('https://www.googleapis.com/oauth2/v4/token', params);
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

    static async getUserInfos(token: string): Promise<any> {
        const data = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    }
}
