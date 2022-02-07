import { ServiceUserData, SSOController } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';
import { GoogleTools } from '../../../../tools/SSO/google.tools';
import { generateToken } from '../../../../tools/auth.tools';
import { createUser, findUserByService, linkService, updateToken } from '../../../../tools/SSO/sso.tool';
import { User } from '../../../../../../../packages/services';

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

    static async getToken(req: Request, res: Response): Promise<void> {
        // get token, create user and return token
        try {
            const { code } = req.query;
            const { user: sessionUser } = req.session;
            if (!code || typeof code !== 'string') {
                throw new Error('No code provided');
            }
            const SSOToken = await GoogleTools.getToken(code);
            const user: ServiceUserData = await GoogleTools.getUserInfos(SSOToken.access_token);

            var userData: User & any = sessionUser || (await findUserByService('google', user.id));
            if (!userData) {
                userData = await createUser(user.displayName, user.email, '', 'SSO');
                await linkService(userData, user, SSOToken);
            } else {
                await updateToken(userData, user, SSOToken);
            }
            delete userData.password;
            const token = generateToken(userData);
            res.status(200).json({ data: userData, token });
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}
