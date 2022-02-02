import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import configuration from '../../configuration';
dotenv.config();

// generate jwt token
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

export const parseCookieSession = (req: Request, $res: Response, next: NextFunction) => {
    const cookie = req.cookies['API_TOKEN'];
    try {
        if (cookie) {
            const decoded = jwt.verify(JSON.parse(cookie), process.env.JWT_SECRET || 'secret');
            if (typeof decoded != 'string' && decoded.id) req.session.user = decoded;
        }
    } catch (e) {
        req.session.user = undefined;
        console.log(e);
    }
    next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['Authorization'] || req.cookies['API_TOKEN'];
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
        access_token = JSON.parse(bearerHeader);
    }

    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET || 'secret');
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
