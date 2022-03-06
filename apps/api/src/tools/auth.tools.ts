import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import configuration from '../../configuration';
import { User } from '../../../../packages/services';

dotenv.config();

export const generateToken = (user: any): string => {
    return jwt.sign(user, configuration.JWT_SECRET || 'secret', {
        expiresIn: '1h',
    });
};

export function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export function checkPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'] || req.headers['Authorization'] || req.cookies['API_TOKEN'];
    if (!bearerHeader) {
        return res.status(401).send({
            status: 'error',
            message: 'Access denied. No token provided.',
        });
    }

    let access_token: string;

    if (bearerHeader.startsWith('Bearer ')) {
        const [$bearer, token] = bearerHeader.split(' ');
        access_token = token;
    } else {
        access_token = bearerHeader;
    }

    try {
        const decoded: User & any = jwt.verify(access_token, configuration.JWT_SECRET || 'secret');
        if (typeof decoded != 'string' && decoded.id) {
            req.session.user = decoded;
            next();
        } else {
            return res.status(401).send({
                status: 'error',
                message: 'Access denied. Invalid token.',
            });
        }
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({
                status: 'error',
                message: 'Access denied. Token expired.',
            });
        } else {
            return res.status(401).send({
                status: 'error',
                message: 'Access denied. Invalid token.',
            });
        }
    }
};

export async function parseToken(req: Request, res: Response, next: NextFunction) {
    // Parse token, decode it and set req.session.user
    try {
        const bearerHeader = req.headers['Authorization'] || req.headers['authorization'] || req.cookies['API_TOKEN'];
        if (!bearerHeader) {
            return next();
        }
        let access_token: string;

        if (bearerHeader.startsWith('Bearer ')) {
            const [$bearer, token] = bearerHeader.split(' ');
            access_token = token;
        } else {
            access_token = bearerHeader;
        }
        const decoded: User & any = jwt.verify(access_token, configuration.JWT_SECRET || 'secret');
        if (typeof decoded != 'string' && decoded.id) {
            req.session.user = decoded;
        }
        next();
    } catch (e) {
        console.error(e);
    }
}
