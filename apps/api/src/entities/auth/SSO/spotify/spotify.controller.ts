import { ServiceUserData, SSOController } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';
import { createUser, findUserByService, linkService, updateToken } from '../../../../tools/SSO/sso.tool';
import { generateToken } from '../../../../tools/auth.tools';
import { SpotifyTools } from '../../../../tools/SSO/spotify.tools';
import { User } from '../../../../../../../packages/services';

export default class SpotifyController extends SSOController {
    static clientId: string = configuration.spotifyClientId;
    static clientSecret: string = configuration.spotifyClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.spotifyRedirectUri;
    static scope: string = configuration.spotifyScopes;

    static async getCode(req: Request, res: Response): Promise<void> {
        const { callbackURL } = req.query;

        const scopes = SpotifyController.scope.split(' ');
        const params = {
            client_id: SpotifyController.clientId,
            response_type: 'code',
            redirect_uri: callbackURL || SpotifyController.callbackURL,
            scope: scopes.join(' '),
            // show_dialog: true, // was boolean
        };
        // @ts-ignore
        const url = `https://accounts.spotify.com/authorize?${new URLSearchParams(params)}`;
        res.json({ url, ...params, base_url: 'https://accounts.spotify.com/authorize', scopes: scopes });
    }

    static async getToken(req: Request, res: Response): Promise<void> {
        try {
            const { code, callbackURL } = req.query;
            const { user: sessionUser } = req.session;
            if (!code || typeof code !== 'string') {
                throw new Error('No code provided');
            }
            const SSOToken = await SpotifyTools.getToken(
                code,
                (callbackURL as string) || SpotifyController.callbackURL,
            );
            const user: ServiceUserData = await SpotifyTools.getUserInfos(SSOToken.access_token);
            let userData: User & any = await findUserByService('spotify', user.id);

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
