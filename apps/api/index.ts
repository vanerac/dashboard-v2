import express, { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './src/entities';
import configuration from './configuration';
import swaggerUi from 'swagger-ui-express';
import { User } from '../../packages/services';
import { Service } from './src/tools/types';
// import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
// import SecuritySchemeObject = OpenAPIV3.SecuritySchemeObject;
const swaggerDocument = require('./generated/openapi-v1.json');

const sessionConfig = {
    user: {},
    local: {
        service: undefined,
    },
    secret: process.env.COOKIE_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
};

declare module 'express-session' {
    export interface SessionData {
        user: User;
        [key: string]: any;
        service: Service;
    }
}

const app = express();

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    cors({
        origin: '*',
        // credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    }),
);

app.use((req: Request, res: Response, next: Function) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// app.use(
//     OpenApiValidator.middleware({
//         apiSpec: './generated/openapi-v1.json',
//         validateRequests: {
//             removeAdditional: 'failing',
//             allowUnknownQueryParameters: false,
//         },
//         validateResponses: {
//             removeAdditional: 'failing',
//         },
//         validateFormats: 'full',
//         operationHandlers: false,
//         // validateSecurity: {
//         //     handlers: {
//         //         BearerAuth: (req: Request, scopes: string[], schema: SecuritySchemeObject): boolean => {
//         //             // parse header token for Bearer Token
//         //             console.log(scopes, schema);
//         //             const token = req.headers['Authorization'] as string | undefined;
//         //             console.log(!!token?.match(/^Bearer\s+(.*)$/));
//         //             throw new Error('test');
//         //             return !!token?.match(/^Bearer\s+(.*)$/);
//         //         },
//         //     },
//         // },
//     }),
// );

app.use('/api', routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
    next();
});

app.listen(configuration.serverPort, () => {
    console.log('Server is running on port ', configuration.serverPort);
});
