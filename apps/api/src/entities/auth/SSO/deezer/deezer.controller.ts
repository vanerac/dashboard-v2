import { ServiceUserData, SSOController } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';
import { DeezerTools } from '../../../../tools/SSO/deezer.tools';
import { generateToken } from '../../../../tools/auth.tools';
import { createUser, findUserByService, linkService, updateToken } from '../../../../tools/SSO/sso.tool';
import { User } from '../../../../../../../packages/services';

export default class DeezerController extends SSOController {
    static clientId: string = configuration.googleClientId;
    static clientSecret: string = configuration.appleClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.googleRedirectUri;
    static scope: string = configuration.googleScopes;

    static async getCode(req: Request, res: Response): Promise<void> {
        const params = {
            client_id: DeezerController.clientId,
            redirect_uri: DeezerController.callbackURL,
            scope: DeezerController.scope,
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
        };
        const url = `https://connect.deezer.com/oauth/auth.php?${new URLSearchParams(params)}`;
        res.status(302).redirect(url);
    }

    static async getToken(req: Request, res: Response): Promise<void> {
        // get token, create user and return token
        try {
            const { code } = req.query;
            const { user: sessionUser } = req.session;
            if (!code || typeof code !== 'string') {
                throw new Error('No code provided');
            }
            const SSOToken = await DeezerTools.getToken(code);
            const user: ServiceUserData = await DeezerTools.getUserInfos(SSOToken.access_token);

            var userData: User & any = sessionUser || (await findUserByService('deezer', user.id));
            if (!userData) {
                userData = await createUser(user.displayName, user.email, '', 'SSO');
                await linkService(userData, user, SSOToken);
            } else {
                await updateToken(userData, user, SSOToken);
            }
            delete userData.password;
            const token = generateToken(userData);
            res.status(200).json({ token });
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}
