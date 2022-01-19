import { Request, Response } from 'express';

export abstract class SSOController {
    static async getCode($req: Request, $res: Response): Promise<void> {}

    static async getToken($req: Request, $res: Response): Promise<void> {}
}

export abstract class SSOTools {
    static async getToken($code: string): Promise<string> {
        return 'Not implemented';
    }

    static async refreshToken($refreshToken: string): Promise<string> {
        return 'Not implemented';
    }

    static async getUserInfos($token: string): Promise<any> {
        return { error: 'Not implemented' };
    }
}

export interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

// export abstract class SSOAudioManager {
//     static play
// }
