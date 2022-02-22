import { ServiceUserData, SSOTools, Token } from '../types';
import axios from 'axios';
import configuration from '../../../configuration';
import * as querystring from 'querystring';

export class LastFmTools implements SSOTools {
    static clientId: string = configuration.lastFmClientId;
    static clientSecret: string = configuration.lastFmClientSecret;
    static callbackURL: string = configuration.lastFmRedirectUri;
    static scope: string = configuration.lastFmScopes;

    static async getSignature(token: Token): Promise<string> {
        const response = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token.access_token}&api_key=${LastFmTools.clientId}&format=json`,
        );
        return response.data.session.key;
    }

    static async getToken(code: string, $callbackURL: string): Promise<Token> {
        const response = await axios({
            method: 'post',
            url: 'https://ws.audioscrobbler.com/2.0/',
            data: querystring.stringify({
                method: 'auth.getToken',
                api_key: LastFmTools.clientId,
                api_sig: await LastFmTools.getSignature({ access_token: code } as Token),
                token: code,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        response.data.provider = 'lastFm';
        return response.data;
    }

    static async refreshToken(refreshToken: string): Promise<Token> {
        const response = await axios({
            method: 'post',
            url: 'https://ws.audioscrobbler.com/2.0/',
            data: querystring.stringify({
                method: 'auth.getToken',
                api_key: LastFmTools.clientId,
                api_sig: await LastFmTools.getSignature({ access_token: refreshToken } as Token),
                token: refreshToken,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }

    static async getUserInfos(token: string): Promise<ServiceUserData> {
        const response = await axios.get('https://ws.audioscrobbler.com/2.0/', {
            params: {
                method: 'user.getinfo',
                user: '',
                api_key: LastFmTools.clientId,
                format: 'json',
                token,
            },
        });
        return {
            id: response.data.user.id,
            displayName: response.data.user.name,
            email: response.data.user.realname,
            password: undefined,
        };
    }
}
