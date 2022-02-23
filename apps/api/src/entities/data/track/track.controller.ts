import { NextFunction, Request, Response } from 'express';
import { Providers } from '../../../tools/types';

import { DeezerTrackService, SpotifyTrackService, TrackService, YoutubeTrackService } from './track.service';

const servicesList: {
    [key: string]: TrackService;
} = {
    [Providers.SPOTIFY]: SpotifyTrackService,
    [Providers.DEEZER]: DeezerTrackService,
    [Providers.GOOGLE]: YoutubeTrackService,
};

export default class TrackController {
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { trackId } = req.params;
            const { provider, accessToken } = req.session.service;
            const serviceInstance: TrackService = servicesList[provider] as TrackService;
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }

            // @ts-ignore
            const fn = serviceInstance.getById;
            const playlists = await fn(accessToken, trackId);
            return res.json(playlists);
        } catch (error) {
            next(error);
        }
    }

    static async like(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { trackId } = req.params;
            const { provider, accessToken } = req.session.service;
            const serviceInstance: TrackService = servicesList[provider] as TrackService;
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            // @ts-ignore todo: fix this
            const fn = serviceInstance.like;
            const playlists = await fn(accessToken, trackId);
            return res.json(playlists);
        } catch (error) {
            next(error);
        }
    }

    static async unlike(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { trackId } = req.params;
            const { provider, accessToken } = req.session.service;
            const serviceInstance: TrackService = servicesList[provider] as TrackService;
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            // @ts-ignore todo: fix this
            const fn = serviceInstance.unlike;
            const playlists = await fn(accessToken, trackId);
            return res.json(playlists);
        } catch (error) {
            next(error);
        }
    }

    static async addToPlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { trackId, playlistId } = req.params;
            const { provider, accessToken } = req.session.service;
            const serviceInstance: TrackService = servicesList[provider] as TrackService;
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            // @ts-ignore todo: fix this
            const fn = serviceInstance.addToPlaylist;
            await fn(accessToken, trackId, playlistId);
            return res.status(200).end();
        } catch (error) {
            next(error);
        }
    }

    static async removeFromPlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { trackId, playlistId } = req.params;
            const { provider, accessToken } = req.session.service;
            const serviceInstance: TrackService = servicesList[provider] as TrackService;
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            // @ts-ignore todo: fix this
            const fn = serviceInstance.removeFromPlaylist;
            await fn(accessToken, trackId, playlistId);
            return res.status(200).end();
        } catch (error) {
            next(error);
        }
    }

    static async getAlbum(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { albumId } = req.params;
            const { provider, accessToken } = req.session.service;
            const serviceInstance: TrackService = servicesList[provider] as TrackService;
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            // @ts-ignore todo: fix this
            const fn = serviceInstance.getAlbum;
            const album = await fn(accessToken, albumId);
            return res.json(album);
        } catch (error) {
            next(error);
        }
    }

    static async getArtist(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { artistId } = req.params;
            const { provider, accessToken } = req.session.service;
            const serviceInstance: TrackService = servicesList[provider] as TrackService;
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            // @ts-ignore todo: fix this
            const fn = serviceInstance.getArtist;
            const artist = await fn(accessToken, artistId);
            return res.json(artist);
        } catch (error) {
            next(error);
        }
    }
}
