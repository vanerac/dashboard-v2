import { Request, Response } from 'express';

export interface ServiceUserData {
    id: string;
    displayName: string;
    email: string;
    password: string | undefined;
}

export type UUID = string;

export abstract class SSOController {
    static async getCode($req: Request, $res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }

    static async getToken($req: Request, $res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export abstract class SSOTools {
    static async getToken($code: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    static async refreshToken($refreshToken: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    static async getUserInfos($token: string): Promise<ServiceUserData> {
        throw new Error('Method not implemented.');
    }
}

export interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    provider: string;
}

export enum Providers {
    $GOOGLE = 'google',
    $SPOTIFY = 'spotify',
    $APPLE = 'apple',
    $LAST_FM = 'lastfm',
}

// export abstract class SSOAudioManager {
//     static play
// }
