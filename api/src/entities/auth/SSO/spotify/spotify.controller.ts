import { ServiceUserData, SSOController, User } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';
import { createUser, findUserByService, linkService, updateToken } from '../../../../tools/SSO/sso.tool';
import { generateToken } from '../../../../tools/auth.tools';
import { SpotifyTools } from '../../../../tools/SSO/spotify.tools';

export default class SpotifyController extends SSOController {
    static clientId: string = configuration.spotifyClientId;
    static clientSecret: string = configuration.spotifyClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.spotifyRedirectUri;
    static scope: string = configuration.spotifyScopes;

    static async getCode(req: Request, res: Response): Promise<void> {
        const params = {
            client_id: SpotifyController.clientId,
            response_type: 'code',
            redirect_uri: SpotifyController.callbackURL,
            scope: SpotifyController.scope,
            // show_dialog: true, // was boolean
        };
        const url = `https://accounts.spotify.com/authorize?${new URLSearchParams(params)}`;
        res.redirect(url);
    }

    static async getToken(req: Request, res: Response): Promise<void> {
        try {
            const { code } = req.query;
            const { user: sessionUser } = req.session;
            if (!code || typeof code !== 'string') {
                throw new Error('No code provided');
            }
            const SSOToken = await SpotifyTools.getToken(code);
            const user: ServiceUserData = await SpotifyTools.getUserInfos(SSOToken.access_token);

            var userData: User & any = sessionUser || (await findUserByService('spotify', user.id));
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
