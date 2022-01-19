import express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './src/entities';

const sessionConfig = {
    user: {},
    secret: process.env.COOKIE_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
};

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

const app = express();

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(bodyParser.json());

app.use(
    cors({
        origin: process.env.FRONTEND_HOST || 'http://localhost:3000',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    }),
);

app.use((req: Request, res: Response, next: Function) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use('/api', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
