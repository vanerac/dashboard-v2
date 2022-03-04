import { ServiceUserData, SSOController, Token } from '../../../../tools/types';
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
        res.json({ url, ...params, base_url: 'https://www.last.fm/api/auth/' });
    }

    static async getToken(req: Request, res: Response): Promise<void> {
        // get token, create user and return token
        try {
            const { token } = req.query;
            const { user: sessionUser } = req.session;
            if (!token || typeof token !== 'string') {
                throw new Error('No code provided');
            }
            // const SSOToken = await LastFmTools.getToken(token, (callbackURL as string) || LastFmController.callbackURL);
            const SSOToken: Token = {
                provider: 'lastfm',
                refresh_token: '',
                access_token: token,
                expires_in: 3600,
            };
            const user: ServiceUserData = await LastFmTools.getUserInfos(SSOToken.access_token);
            let userData: User & any = await findUserByService('lastfm', user.id);

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
            const userToken = generateToken(userData);
            res.status(200).json({ userToken });
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
