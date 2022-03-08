import { NextFunction, Request, Response } from 'express';
import {
    AppleArtistService,
    ArtistService,
    DeezerArtistService,
    GoogleArtistService,
    SpotifyArtistService,
} from './artist.service';
import { Providers } from '../../../tools/types';

const servicesList: {
    [provider: string]: ArtistService;
} = {
    [Providers.SPOTIFY]: SpotifyArtistService,
    [Providers.DEEZER]: DeezerArtistService,
    [Providers.GOOGLE]: GoogleArtistService,
    [Providers.APPLE]: AppleArtistService,
};
export default class ArtistController {
    static async getArtistById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistById;
            console.log(fn, id, provider);
            const artists = await fn(accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async getFollowedArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            switch (provider) {
                case Providers.SPOTIFY:
                    return res.json(await SpotifyArtistService.getFollowedArtists(accessToken));
                case Providers.DEEZER:
                    return res.json(await DeezerArtistService.getFollowedArtists(accessToken));
                case Providers.GOOGLE:
                    return res.json(await GoogleArtistService.getFollowedArtists(accessToken));
                case Providers.APPLE:
                    return res.json(await AppleArtistService.getFollowedArtists(accessToken));
                default:
                    return res.status(400).json({
                        error: 'Service not found',
                    });
            }
            // @ts-ignore
            const fn = serviceInstance.getFollowedArtists;
            console.log(servicesList, fn, id, provider);
            const artists = await fn(accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async followArtist(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.followArtist;
            console.log(fn, accessToken, id);
            const artist = await fn(accessToken, id);
            return res.json(artist);
        } catch (error: any) {
            next(error);
        }
    }

    static async unfollowArtist(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.unfollowArtist;
            const artist = await fn(accessToken, id);
            return res.json(artist);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistAlbums(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistAlbums;
            const albums = await fn(accessToken, id);
            return res.json(albums);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistPlaylists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistPlaylists;
            const playlists = await fn(accessToken, id);
            return res.json(playlists);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistRelatedArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistRelatedArtists;
            const artists = await fn(accessToken, id);
            return res.json(artists);
        } catch (error: any) {
            next(error);
        }
    }

    static async getArtistTopTracks(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { provider, accessToken } = req.session.service;
            const serviceInstance: ArtistService = servicesList[provider];
            if (!serviceInstance) {
                return res.status(400).json({
                    error: 'Service not found',
                });
            }
            const { id } = req.params;

            // @ts-ignore
            const fn = serviceInstance.getArtistTopTracks;
            const tracks = await fn(accessToken, id);
            return res.json(tracks);
        } catch (error: any) {
            next(error);
        }
    }
}
