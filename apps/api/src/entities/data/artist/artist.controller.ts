import { NextFunction, Request, Response } from 'express';
import { ArtistService, DeezerArtistService,GoogleArtistService, SpotifyArtistService } from './artist.service';
import { Providers } from '../../../tools/types';
import { PlaylistService } from '../playlists/playlist.service';

const servicesList: {
    [provider: string]: ArtistService;
} = {
    [Providers.SPOTIFY]: SpotifyArtistService,
    [Providers.DEEZER]: DeezerArtistService,
    [Providers.GOOGLE]: GoogleArtistService,
};
export default class ArtistController {
    static async getArtistById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistById;
            const artists = await fn(req.session.local.service.accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async getFollowedArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getFollowedArtists;
            const artists = await fn(req.session.local.service.accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async followArtist(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.followArtist;
            const artist = await fn(req.session.local.service.accessToken, id);
            return res.json(artist);
        } catch (error: any) {
            next(error);
        }
    }

    static async unfollowArtist(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.unfollowArtist;
            const artist = await fn(req.session.local.service.accessToken, id);
            return res.json(artist);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistAlbums(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistAlbums;
            const albums = await fn(req.session.local.service.accessToken, id);
            return res.json(albums);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistPlaylists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistPlaylists;
            const playlists = await fn(req.session.local.service.accessToken, id);
            return res.json(playlists);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistRelatedArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistRelatedArtists;
            const artists = await fn(req.session.local.service.accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistTopTracks(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;
            const serviceInstance: PlaylistService = servicesList[service];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistTopTracks;
            const tracks = await fn(req.session.local.service.accessToken, id);
            return res.json(tracks);
        } catch (error: any) {
            next(error);
        }
    }
}
