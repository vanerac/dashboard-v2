import { SSOController } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';

export default class GoogleController extends SSOController {
    static clientId: string = configuration.googleClientId;
    static clientSecret: string = configuration.appleClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.googleRedirectUri;
    static scope: string = configuration.googleScopes;

    static async getCode(req: Request, res: Response): Promise<void> {
        // redirect to google for authentication
        // callback url sends to /api/auth/google/callback
        const params = {
            client_id: GoogleController.clientId,
            redirect_uri: GoogleController.callbackURL,
            scope: GoogleController.scope,
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
        };
        const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(params)}`;
        res.redirect(url);
    }

    static async getToken($req: Request, $res: Response): Promise<void> {
        // get token, create user and return token
    }
}
