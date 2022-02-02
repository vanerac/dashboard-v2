import { Request, Response } from 'express';
import Pool from '../../tools/database.tools';

export default class ServiceController {
    static async getServicesById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!req.session.user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }
            const { id: userId } = req.session.user;
            const query = `SELECT id, type, enabled FROM services WHERE id = $1 AND userid = $2`;
            const { rows: services } = await Pool.query(query, [id, userId]);
            if (!services || services.length === 0) {
                return res.status(404).json({
                    message: 'Service not found',
                });
            }
            return res.status(200).json(services);
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    static async getAllServices(req: Request, res: Response) {
        try {
            if (!req.session.user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }
            const { id: userId } = req.session.user;
            const query = `SELECT id, type, description, enabled FROM services WHERE userid = $1`;
            const { rows: services } = await Pool.query(query, [userId]);
            if (!services) {
                return res.status(404).json({
                    message: 'Services not found',
                });
            }
            return res.status(200).json(services);
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    static async updateService(req: Request, res: Response) {
        // if user want to disable a service
        try {
            const { id } = req.params;
            if (!req.session.user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }
            const { id: userId } = req.session.user;
            const { enabled } = req.body;
            const query = `UPDATE services SET enabled = $1 WHERE id = $2 AND userid = $3 RETURNING id, provider, enabled`;
            const { rows: services } = await Pool.query(query, [enabled, id, userId]);
            if (!services || services.length === 0) {
                return res.status(404).json({
                    message: 'Service not found',
                });
            }
            return res.status(200).json({
                message: 'Service updated',
                data: services,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    static async deleteService(req: Request, res: Response) {
        // if user want to delete a service
        try {
            const { id } = req.params;
            if (!req.session.user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }
            const { id: userId } = req.session.user;
            const query = `DELETE FROM services WHERE id = $1 AND userid = $2`;
            const { rows: services } = await Pool.query(query, [id, userId]);
            if (!services || services.length === 0) {
                return res.status(404).json({
                    message: 'Service not found',
                });
            }
            return res.status(200).json({
                message: 'Service deleted',
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}
