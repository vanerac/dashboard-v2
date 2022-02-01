import express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './src/entities';
import configuration from './configuration';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./entities/openapi.index.json');

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

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    cors({
        origin: configuration.frontendHost,
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

app.listen(configuration.serverPort, () => {
    console.log('Server is running on port ', configuration.serverPort);
});
