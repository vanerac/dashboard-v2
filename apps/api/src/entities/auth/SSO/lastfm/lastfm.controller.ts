import { ServiceUserData, SSOController } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';
import { LastFmTools } from '../../../../tools/SSO/lastfm.tools';
import { generateToken } from '../../../../tools/auth.tools';
import { createUser, findUserByService, linkService, updateToken } from '../../../../tools/SSO/sso.tool';
import { User } from '../../../../../../../packages/services';

export default class LastFmController extends SSOController {
    static clientId: string = configuration.lastFmClientId;
    static clientSecret: string = configuration.appleClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.lastFmRedirectUri;
    static scope: string = configuration.lastFmScopes;

    static async getCode(req: Request, res: Response): Promise<void> {
        // redirect to lastFm for authentication
        // callback url sends to /api/auth/lastFm/callback
        const { callbackURL } = req.query;

        const params = {
            client_id: LastFmController.clientId,
            response_type: 'code',
            redirect_uri: callbackURL || LastFmController.callbackURL,
            scope: LastFmController.scope,
        };
        // @ts-ignore
        const url = `https://www.last.fm/api/auth/?${new URLSearchParams(params)}`;
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
            const SSOToken = await LastFmTools.getToken(code, (callbackURL as string) || LastFmController.callbackURL);
            const user: ServiceUserData = await LastFmTools.getUserInfos(SSOToken.access_token);
            let userData: User & any = await findUserByService('lastfm', user.id);

            if (sessionUser) {
                if (!userData) {
                    await linkService(sessionUser, user, SSOToken);
                } else {
                    await updateToken(userData, user, SSOToken);
                }
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
            console.log(e);
            res.status(500).send(e);
        }
    }
}
