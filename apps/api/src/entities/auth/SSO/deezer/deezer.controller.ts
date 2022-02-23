import { ServiceUserData, SSOController } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';
import { DeezerTools } from '../../../../tools/SSO/deezer.tools';
import { generateToken } from '../../../../tools/auth.tools';
import { createUser, findUserByService, linkService, updateToken } from '../../../../tools/SSO/sso.tool';
import { User } from '../../../../../../../packages/services';

export default class DeezerController extends SSOController {
    static clientId: string = configuration.deezerClientId;
    static clientSecret: string = configuration.deezerClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.deezerRedirectUri;
    static scope: string = configuration.deezerScopes;

    static async getCode(req: Request, res: Response): Promise<void> {
        const { callbackURL } = req.query;
        const params = {
            client_id: DeezerController.clientId,
            redirect_uri: callbackURL || DeezerController.callbackURL,
            scope: DeezerController.scope,
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
        };
        // @ts-ignore
        const url = `https://connect.deezer.com/oauth/auth.php?${new URLSearchParams(params)}`;
        res.json({ url });
    }

    static async getToken(req: Request, res: Response): Promise<void> {
        // get token, create user and return token
        try {
            const { code, callbackURL } = req.query;
            const { user: sessionUser } = req.session;
            if (!code || typeof code !== 'string') {
                throw new Error('No code provided');
            }
            const SSOToken = await DeezerTools.getToken(code, (callbackURL as string) || DeezerController.callbackURL);
            const user: ServiceUserData = await DeezerTools.getUserInfos(SSOToken.access_token);
            let userData: User & any = await findUserByService('deezer', user.id);

            if (userData) {
                await updateToken(userData, user, SSOToken);
            } else if (sessionUser) {
                await linkService(sessionUser, user, SSOToken);
                userData = sessionUser;
            } else {
                userData = await createUser(user.displayName, user.email, '', 'SSO');
                await linkService(userData, user, SSOToken);
            }

            delete userData.password;
            delete userData.iat;
            delete userData.exp;
            const token = generateToken(userData);
            res.status(200).json({ token });
        } catch (e) {
            if ((e as any).code === '23505') {
                res.status(409).json({
                    message: 'Account already assigned to another user',
                });
            } else {
                res.status(500).send(e);
            }
        }
    }
}
