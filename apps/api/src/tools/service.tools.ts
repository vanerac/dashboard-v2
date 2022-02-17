import { Request, Response, NextFunction } from 'express';
import Pool from './database.tools';

export function parseServiceId(req: Request, res: Response, next: NextFunction): void  {
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
        const query = `SELECT * FROM services WHERE id = $1 AND userid = $2`;
        const {
            rows: [service],
        } = await Pool.query(query, [serviceId, userId]);
        if (!service) {
            return res.status(404).send('Service not found');
        }
        req.session.local.service = service;
        next();
    })();
}
