import { ServiceUserData, SSOTools, Token } from '../types';
import configuration from '../../../configuration';
import axios from 'axios';

export class AppleTools implements SSOTools {
    static clientId: string = configuration.appleClientId;
    static clientSecret: string = configuration.appleClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.appleRedirectUri;
    static scope: string = configuration.appleScopes;

    static async getToken(code: string, callbackURL: string): Promise<Token> {
        const url = 'https://appleid.apple.com/auth/token';
        const params = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: callbackURL,
            client_id: AppleTools.clientId,
            client_secret: AppleTools.clientSecret,
        };
        const response = await axios.post(url, params);
        return response.data;
    }

    static async refreshToken(refreshToken: string): Promise<Token> {
        const url = 'https://appleid.apple.com/auth/token';
        const params = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: AppleTools.clientId,
            client_secret: AppleTools.clientSecret,
        };
        const response = await axios.post(url, params);
        return response.data;
    }

    static async getUserInfos(token: string): Promise<ServiceUserData> {
        const url = 'https://appleid.apple.com/auth/token';
        const params = {
            grant_type: 'authorization_code',
            code: token,
            redirect_uri: AppleTools.callbackURL,
            client_id: AppleTools.clientId,
            client_secret: AppleTools.clientSecret,
        };
        const response = await axios.post(url, params);
        const userData = response.data;
        return {
            displayName: userData.name.givenName,
            password: undefined,
            id: userData.user_id,
            email: userData.email,
        };
    }
}
