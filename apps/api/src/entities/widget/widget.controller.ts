import { NextFunction, Request, Response } from 'express';
import Pool from '../../tools/database.tools';
import { Widget } from '../../../../../packages/services';

export default class WidgetController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req.session;
            const query = `SELECT serviceid as "serviceId", * FROM widgets WHERE userId = $1`;
            const { rows: widgets } = await Pool.query(query, [user?.id]);
            res.json(widgets);
        } catch (e) {
            next(e);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { user } = req.session;
            const query = `SELECT * FROM widgets WHERE id = ${id} AND userId = ${user?.id}`;
            const {
                rows: [widget],
            } = await Pool.query(query);
            if (!widget) {
                return res.status(404).json({
                    message: 'Widget not found',
                });
            }
            res.json(widget);
        } catch (e) {
            next(e);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req.session;
            try {
                Object.keys(req.body).forEach((key) => {
                    if (!['serviceId', 'x', 'y', 'width', 'height', 'type', 'data'].includes(key))
                        throw new Error(`Invalid property: ${key}`);
                });
            } catch (e) {
                return next(e);
            }
            const query = `INSERT INTO widgets(${Object.keys(req.body).join(',')}, userId) VALUES(${Object.values(
                req.body,
            ).map(($value, index) => `$${index + 1}`)}, $${
                Object.values(req.body).length + 1
            }) RETURNING serviceid as "serviceId", *`;
            console.log(query, [...Object.values(req.body), user?.id]);
            const {
                rows: [widget],
            } = await Pool.query(query, [...Object.values(req.body), user?.id]);
            res.json(widget);
        } catch (e) {
            next(e);
        }
    }

    static async updateBulk(req: Request, res: Response, next: NextFunction) {
        // take x,height,y,width
        try {
            const widgets = req.body;
            console.log(req.body);

            const updateQuery = widgets.map((widget: Widget) => {
                return `UPDATE widgets SET x = ${widget.x}, y = ${widget.y}, width = ${widget.width}, height = ${widget.height} WHERE id = '${widget.id}' RETURNING *`;
            });

            await Pool.query(updateQuery.join(';'));
            res.json();
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { user } = req.session;

            Object.keys(req.body).map((key) => {
                if (!['x', 'y', 'width', 'height', 'data'].includes(key)) throw new Error(`Invalid property: ${key}`);
            });

            // Todo: Note, this is not a good way to do this, but it's a quick fix
            const query = `UPDATE widgets SET ${Object.keys(req.body)
                .map((key) => `${key} = ${req.body[key]}`)
                .join(', ')} WHERE id = ${id} AND userId = ${user?.id}`;
            const {
                rows: [widget],
            } = await Pool.query(query);
            if (!widget) {
                return res.status(404).json({
                    error: 'Widget not found',
                });
            }
            res.json(widget);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { user } = req.session;
            const query = `DELETE FROM widgets WHERE id = $1 AND userId = $2`;
            const {
                rows: [widget],
            } = await Pool.query(query, [id, user?.id]);
            console.log('query => ', query, [id, user?.id]);
            res.json(widget);
        } catch (e) {
            next(e);
        }
    }
}
