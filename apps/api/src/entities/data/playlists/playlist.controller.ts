import { NextFunction, Request, Response } from 'express';
import { Providers } from '../../../tools/types';
import {
    ApplePlaylistService,
    DeezerPlaylistService,
    GooglePlaylistService,
    PlaylistService,
    SpotifyPlaylistService,
} from './playlist.service';

const servicesList: {
    [provider: string]: PlaylistService;
} = {
    [Providers.SPOTIFY]: SpotifyPlaylistService,
    [Providers.DEEZER]: DeezerPlaylistService,
    [Providers.GOOGLE]: GooglePlaylistService,
    [Providers.$APPLE]: ApplePlaylistService,
};

export default class PlaylistController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
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
            const fn = serviceInstance.getPlaylists;
            const playlists = await fn(accessToken);
            return res.json(playlists);
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
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
            // @ts-ignore todo: fix this
            const fn = serviceInstance.getPlaylist;
            const playlist = await fn(accessToken, req.params.id);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }

    static async getTracks(req: Request, res: Response, next: NextFunction) {
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
            // @ts-ignore todo: fix this
            const fn = serviceInstance.getPlaylistTracks;
            const tracks = await fn(accessToken, req.params.id);
            return res.json(tracks);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
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
            // @ts-ignore todo: fix this
            const fn = serviceInstance.createPlaylist;
            const playlist = await fn(accessToken, req.body.name);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
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
            // @ts-ignore todo: fix this
            const fn = serviceInstance.updatePlaylist;
            const playlist = await fn(accessToken, req.params.id, req.body.name);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
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
            // @ts-ignore todo: fix this
            const fn = serviceInstance.deletePlaylist;
            const playlist = await fn(accessToken, req.params.id);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }

    static async savePlaylist(req: Request, res: Response, next: NextFunction) {
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
            // @ts-ignore todo: fix this
            const fn = serviceInstance.savePlaylist;
            const playlist = await fn(accessToken, req.params.id);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }

    static async unsavePlaylist(req: Request, res: Response, next: NextFunction) {
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
            // @ts-ignore todo: fix this
            const fn = serviceInstance.unsavePlaylist;
            const playlist = await fn(accessToken, req.params.id);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }
}
