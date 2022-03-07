import { NextFunction, Request, Response } from 'express';
import AlbumService, { DeezerAlbumService, SpotifyAlbumService } from './album.service';
import { Providers } from '../../../tools/types';
import { PlaylistService } from '../playlists/playlist.service';

const servicesList: {
    [provider: string]: AlbumService;
} = {
    [Providers.SPOTIFY]: SpotifyAlbumService,
    [Providers.DEEZER]: DeezerAlbumService,
};

export default class AlbumController {
    static async getAllSaved(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: PlaylistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }

            // @ts-ignore
            const fn = serviceInstance.getSavedAlbums;
            const artists = await fn(accessToken);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: PlaylistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getById;
            const artists = await fn(accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: PlaylistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.save;
            const artists = await fn(accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async unsave(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: PlaylistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.unsave;
            const artists = await fn(accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }
}
