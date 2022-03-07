import { NextFunction, Request, Response } from 'express';
import Pool from './database.tools';
import { Service } from '../../../../packages/services';
import { SpotifyTools } from './SSO/spotify.tools';
import { Token } from './types';
import { GoogleTools } from './SSO/google.tools';
import { AppleTools } from './SSO/apple.tools';

export function parseServiceId(req: Request, res: Response, next: NextFunction) {
    (async () => {
        const { serviceId } = req.params;
        if (!req.session.user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const { id: userId } = req.session.user;
        if (!serviceId) {
            return res.status(400).send('Missing service id');
        }
        const query = 'SELECT accesstoken as "accessToken", * FROM services WHERE id = $1 AND userid = $2';
        const {
            rows: [service],
        } = await Pool.query(query, [serviceId, userId]);
        if (!service) {
            return res.status(404).send('Service not found');
        }
        if (service.tokenExpires < new Date()) {
            service.accessToken = await refreshServiceToken(serviceId);
        }
        req.session.service = service;
        next();
    })();
}

export function hasService(provider: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.session.user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const { id: userId } = req.session.user;

        const query = `SELECT * FROM services WHERE provider = $1 AND userid = $2`;
        const data = Pool.query(query, [provider, userId]);
        Promise.resolve(data).then(({ rows: [service] }) => {
            if (!service) {
                return res.status(404).send('Service not found');
            }
            service as Service;
            req.session.service = service;
            next();
        });
    };
}

async function refreshServiceToken(serviceId: string) {
    const query = `SELECT refreshtoken as "refreshToken", provider FROM services WHERE id = $1`;
    const {
        rows: [service],
    } = await Pool.query(query, [serviceId]);
    if (!service) {
        return;
    }
    const { refreshToken, provider } = service;

    let newToken: Token;
    switch (provider) {
        case 'spotify':
            newToken = await SpotifyTools.refreshToken(refreshToken);
            break;
        case 'google':
            newToken = await GoogleTools.refreshToken(refreshToken);
            break;
        case 'apple':
            newToken = await AppleTools.refreshToken(refreshToken);
            break;
        default:
            throw 'Unknown provider';
    }

    const { access_token, expires_in } = newToken;
    const updateQuery = `UPDATE services SET accesstoken = $1, tokenExpires = $2 WHERE id = $3`;
    await Pool.query(updateQuery, [access_token, expires_in, serviceId]);
    return access_token;
}
