import { Request, Response, NextFunction } from 'express';
import { Artist, Track, Album } from '../../../../../packages/services';
export default class StatsController {
    // myTopArtists
    static async myTopArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;

            const { accessToken } = service;

            const params: { [key: string]: any } = {
                method: 'user.gettopartists',
                user: '',
                period: 'overall',
                limit: '10',
                api_key: '',
                format: 'json',
                callback: '',
                page: '1',
                autocorrect: '1',
                accessToken,
            };
            const url = `https://ws.audioscrobbler.com/2.0/?${Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&')}`;
            const response = await fetch(url);
            const json = await response.json();
            const { topartists } = json;
            const { artist } = topartists;
            // Map to Artist type
            const artists: Artist[] = artist.map((artist: any) => ({
                type: 'artist',
                id: artist.mbid,
                name: artist.name,
                image: artist.image[3]['#text'],
                provider: 'lastfm',
                followers: artist.listeners,
                external_urls: artist.url,
            }));
            // Todo: Note: use users prefered service to get artist info
            return res.status(200).json({
                artists,
            });
        } catch (error) {
            next(error);
        }
    }

    // myTopTracks
    static async myTopTracks(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;

            const { accessToken } = service;

            const params: { [key: string]: any } = {
                method: 'user.gettoptracks',
                user: '',
                period: 'overall',
                limit: '10',
                api_key: '',
                format: 'json',
                callback: '',
                page: '1',
                autocorrect: '1',
                accessToken,
            };
            const url = `https://ws.audioscrobbler.com/2.0/?${Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&')}`;
            const response = await fetch(url);
            const json = await response.json();
            const { toptracks } = json;
            const { track } = toptracks;
            // Map to Artist type
            const tracks: Track[] = track.map((track: any) => ({
                type: 'track',
                id: track.mbid,
                name: track.name,
                image: track.image[3]['#text'],
                provider: 'lastfm',
                followers: track.listeners,
                external_urls: track.url,
            }));
            res.status(200).json({
                tracks,
            });
        } catch (error) {
            next(error);
        }
    }

    // myTopAlbums
    static async myTopAlbums(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;

            const { accessToken } = service;

            const params: { [key: string]: any } = {
                method: 'user.gettopalbums',
                user: '',
                period: 'overall',
                limit: '10',
                api_key: '',
                format: 'json',
                callback: '',
                page: '1',
                autocorrect: '1',
                accessToken,
            };
            const url = `https://ws.audioscrobbler.com/2.0/?${Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&')}`;
            const response = await fetch(url);
            const json = await response.json();
            const { toptracks } = json;
            const { album } = toptracks;
            // Map to Artist type
            const albums: Album[] = album.map((album: any) => ({
                type: 'album',
                id: album.mbid,
                name: album.name,
                image: album.image[3]['#text'],
                provider: 'lastfm',
                followers: album.listeners,
                external_urls: album.url,
            }));
            res.status(200).json({
                albums,
            });
        } catch (error) {
            next(error);
        }
    }

    // myTopTags
    static async myTopTags(req: Request, res: Response, next: NextFunction) {}

    // weeklyTopArtists
    static async chartsWeeklyTopArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;

            const { accessToken } = service;

            const params: { [key: string]: any } = {
                method: 'chart.gettopartists',
                api_key: '',
                format: 'json',
                callback: '',
                page: '1',
                autocorrect: '1',
                period: '7day',
                limit: '10',
                accessToken,
            };
            const url = `https://ws.audioscrobbler.com/2.0/?${Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&')}`;
            const response = await fetch(url);
            const json = await response.json();
            const { toptracks } = json;
            const { artist } = toptracks;
            // Map to Artist type
            const artists: Artist[] = artist.map((artist: any) => ({
                type: 'artist',
                id: artist.mbid,
                name: artist.name,
                image: artist.image[3]['#text'],
                provider: 'lastfm',
                followers: artist.listeners,
                external_urls: artist.url,
            }));
            res.status(200).json({
                artists,
            });
        } catch (error) {
            next(error);
        }
    }

    // weeklyTopTracks
    static async chartsWeeklyTopTracks(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;

            const { accessToken } = service;

            const params: { [key: string]: any } = {
                method: 'chart.gettoptracks',
                api_key: '',
                format: 'json',
                callback: '',
                page: '1',
                autocorrect: '1',
                period: '7day',
                limit: '10',
                accessToken,
            };
            const url = `https://ws.audioscrobbler.com/2.0/?${Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&')}`;
            const response = await fetch(url);
            const json = await response.json();
            const { toptracks } = json;
            const { track } = toptracks;
            // Map to Artist type
            const tracks: Track[] = track.map((track: any) => ({
                type: 'track',
                id: track.mbid,
                name: track.name,
                image: track.image[3]['#text'],
                provider: 'lastfm',
                followers: track.listeners,
                external_urls: track.url,
            }));
            res.status(200).json({
                tracks,
            });
        } catch (error) {
            next(error);
        }
    }

    // weeklyTopAlbums
    static async chartsWeeklyTopAlbums(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.local.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { service } = req.session.local.service;

            const { accessToken } = service;

            const params: { [key: string]: any } = {
                method: 'chart.gettopalbums',
                api_key: '',
                format: 'json',
                callback: '',
                page: '1',
                autocorrect: '1',
                period: '7day',
                limit: '10',
                accessToken,
            };
            const url = `https://ws.audioscrobbler.com/2.0/?${Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&')}`;
            const response = await fetch(url);
            const json = await response.json();
            const { toptracks } = json;
            const { album } = toptracks;
            // Map to Artist type
            const albums: Album[] = album.map((album: any) => ({
                type: 'album',
                id: album.mbid,
                name: album.name,
                image: album.image[3]['#text'],
                provider: 'lastfm',
                followers: album.listeners,
                external_urls: album.url,
            }));
            res.status(200).json({
                albums,
            });
        } catch (error) {
            next(error);
        }
    }
}
