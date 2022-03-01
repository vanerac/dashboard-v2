import { NextFunction, Request, Response } from 'express';
import Pool from './database.tools';
import { Service } from '../../../../packages/services';

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
        const query = 'SELECT accesstoken as "accessToken", provider, id FROM services WHERE id = $1 AND userid = $2';
        const {
            rows: [service],
        } = await Pool.query(query, [serviceId, userId]);
        if (!service) {
            return res.status(404).send('Service not found');
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
