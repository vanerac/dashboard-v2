import { ServiceUserData, SSOController } from '../../../../tools/types';
import { Request, Response } from 'express';
import configuration from '../../../../../configuration';

import { createUser, findUserByService, linkService, updateToken } from '../../../../tools/SSO/sso.tool';
import { generateToken } from '../../../../tools/auth.tools';
import { AppleTools } from '../../../../tools/SSO/apple.tools';
import { User } from '../../../../../../../packages/services';

export default class AppleController extends SSOController {
    static clientId: string = configuration.appleClientId;
    static clientSecret: string = configuration.appleClientSecret;
    static redirectURL: string = configuration.frontendHost;
    static callbackURL: string = configuration.appleRedirectUri;
    static scope: string = configuration.appleScopes;

    static async getCode(req: Request, res: Response): Promise<void> {
        const { callbackURL } = req.query;
        const params = {
            client_id: AppleController.clientId,
            redirect_uri: callbackURL || AppleController.callbackURL,
            scope: AppleController.scope,
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
        };
        // @ts-ignore
        const url = `https://appleid.apple.com/auth/authorize?${new URLSearchParams(params).toString()}`;
        res.json({ url });
    }

    static async getToken(req: Request, res: Response): Promise<void> {
        try {
            const { code, callbackURL } = req.query;
            const { user: sessionUser } = req.session;
            if (!code || typeof code !== 'string') {
                throw new Error('No code provided');
            }
            const SSOToken = await AppleTools.getToken(code, (callbackURL as string) || AppleController.callbackURL);
            const user: ServiceUserData = await AppleTools.getUserInfos(SSOToken.access_token);
            let userData: User & any = await findUserByService('apple', user.id);

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
