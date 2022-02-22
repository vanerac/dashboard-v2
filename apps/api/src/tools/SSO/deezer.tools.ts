import { ServiceUserData, SSOTools, Token } from '../types';
import configuration from '../../../configuration';
import axios from 'axios';

export class DeezerTools implements SSOTools {
    static clientId: string = configuration.deezerClientId || '';
    static clientSecret: string = configuration.deezerClientSecret || '';
    static callbackURL: string = configuration.deezerRedirectUri || '';
    static scope: string = configuration.deezerScopes || '';

    static async getToken(code: string, $callbackURL: string): Promise<Token> {
        const url = 'https://connect.deezer.com/oauth/access_token.php';
        const params = {
            app_id: DeezerTools.clientId,
            secret: DeezerTools.clientSecret,
            code: code,
            output: 'json',
        };
        const response = await axios.get(url, { params });
        return response.data;
    }

    static async refreshToken(refreshToken: string): Promise<Token> {
        const url = 'https://connect.deezer.com/oauth/access_token.php';
        const params = {
            app_id: DeezerTools.clientId,
            secret: DeezerTools.clientSecret,
            refresh_token: refreshToken,
            output: 'json',
        };
        const response = await axios.get(url, { params });
        return response.data;
    }

    static async getUserInfos(token: string): Promise<ServiceUserData> {
        const url = 'https://api.deezer.com/user/me';
        const params = {
            access_token: token,
        };
        const response = await axios.get(url, { params });
        return response.data;
    }
}
