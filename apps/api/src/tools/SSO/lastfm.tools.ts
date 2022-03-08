import { ServiceUserData, SSOTools, Token } from '../types';
import configuration from '../../../configuration';
import crypto from 'crypto';

import axios from 'axios';

export class LastFmTools implements SSOTools {
    static clientId: string = configuration.lastFmClientId;
    static clientSecret: string = configuration.lastFmClientSecret;
    static callbackURL: string = configuration.lastFmRedirectUri;
    static scope: string = configuration.lastFmScopes;
    static secondaryClientId: string = configuration.lastFmSecondaryClientId;
    static secondaryClientSecret: string = configuration.lastFmSecondaryClientSecret;

    static createSignature(params: any, secret: string): string {
        let sig = '';
        Object.keys(params)
            .sort()
            .forEach(function (key) {
                if (key != 'format') {
                    var value = typeof params[key] !== 'undefined' && params[key] !== null ? params[key] : '';
                    sig += key + value;
                }
            });
        sig += secret;
        return crypto.createHash('md5').update(sig, 'utf8').digest('hex');
    }

    static async getSessionKey(token: Token, secondaryClient: boolean): Promise<string> {
        const params = {
            method: 'auth.getSession',
            api_key: secondaryClient ? LastFmTools.secondaryClientId : LastFmTools.clientId,
            token: token.access_token,
            format: 'json',
        };
        // @ts-ignore
        params.api_sig = LastFmTools.createSignature(
            params,
            secondaryClient ? LastFmTools.secondaryClientSecret : LastFmTools.clientSecret,
        );
        const response = await axios.get('https://ws.audioscrobbler.com/2.0/', { params });
        return response.data.session.key;
    }

    static async getUserInfos(token: string, sessionKey: string, secondaryClient: boolean): Promise<ServiceUserData> {
        const params = {
            method: 'user.getInfo',
            api_key: LastFmTools.clientId,
            format: 'json',
            sk: sessionKey,
        };
        // @ts-ignore
        params.api_sig = LastFmTools.createSignature(
            params,
            secondaryClient ? LastFmTools.secondaryClientSecret : LastFmTools.clientSecret,
        );
        const response = await axios.get('https://ws.audioscrobbler.com/2.0/', { params });
        return {
            id: response.data.user.name,
            displayName: response.data.user.name,
            password: '',
            email: '',
        };
    }
}
