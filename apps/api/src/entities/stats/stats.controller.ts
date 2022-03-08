import { NextFunction, Request, Response } from 'express';
import { Album, Artist, Tag, Track } from '../../../../../packages/services';
import { LastFmTools } from '../../tools/SSO/lastfm.tools';
import axios from 'axios';

export default class StatsController {
    // myTopArtists
    static async myTopArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { secondaryClient } = req.query;
            const { sessionkey } = req.session.service;

            const params: { [key: string]: any } = {
                method: 'user.gettopartists',
                period: 'overall',
                api_key: JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientId
                    : LastFmTools.clientId,
                format: 'json',
                page: '1',
                sk: sessionkey,
            };
            params.api_sig = LastFmTools.createSignature(
                params,
                JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientSecret
                    : LastFmTools.clientSecret,
            );
            const response = await axios.get('https://ws.audioscrobbler.com/2.0', { params });
            const {
                topartists: { artist },
            } = response.data;
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
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { sessionkey } = req.session.service;
            const { secondaryClient } = req.query;
            const params = {
                method: 'user.gettoptracks',
                period: 'overall',
                api_key: secondaryClient ? LastFmTools.secondaryClientId : LastFmTools.clientId,
                format: 'json',
                page: '1',
                sk: sessionkey,
            };
            // @ts-ignore
            params.api_sig = LastFmTools.createSignature(
                params,
                JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientSecret
                    : LastFmTools.clientSecret,
            );
            const response = await axios.get('https://ws.audioscrobbler.com/2.0', { params });
            const {
                toptracks: { track },
            } = response.data;
            // Map to Track type
            const tracks: Track[] = track.map((track: any) => ({
                type: 'track',
                id: track.mbid,
                name: track.name,
                image: track.image[3]['#text'],
                provider: 'lastfm',
                duration: track.duration,
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
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { sessionkey } = req.session.service;
            const { secondaryClient } = req.query;
            const params = {
                method: 'user.gettopalbums',
                period: 'overall',
                api_key: JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientId
                    : LastFmTools.clientId,
                format: 'json',
                page: '1',
                sk: sessionkey,
            };
            // @ts-ignore
            params.api_sig = LastFmTools.createSignature(
                params,
                JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientSecret
                    : LastFmTools.clientSecret,
            );
            const response = await axios.get('https://ws.audioscrobbler.com/2.0', { params });
            const {
                topalbums: { album },
            } = response.data;
            // Map to Album type
            const albums: Album[] = album.map((album: any) => ({
                type: 'album',
                id: album.mbid,
                name: album.name,
                image: album.image[3]['#text'],
                provider: 'lastfm',
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
    static async myTopTags(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { sessionkey } = req.session.service;
            const { secondaryClient } = req.query;
            const params = {
                method: 'user.gettoptags',
                period: 'overall',
                api_key: JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientId
                    : LastFmTools.clientId,
                format: 'json',
                page: '1',
                sk: sessionkey,
            };
            // @ts-ignore
            params.api_sig = LastFmTools.createSignature(
                params,
                JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientSecret
                    : LastFmTools.clientSecret,
            );
            const response = await axios.get('https://ws.audioscrobbler.com/2.0', { params });
            const {
                toptags: { tag },
            } = response.data;
            // Map to Tag type
            const tags: Tag[] = tag.map((tag: any) => ({
                type: 'tag',
                id: tag.name,
                name: tag.name,
                image: tag.image[3]['#text'],
                provider: 'lastfm',
            }));
            res.status(200).json({
                tags,
            });
        } catch (error) {
            next(error);
        }
    }

    // weeklyTopArtists
    static async chartsWeeklyTopArtists(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { sessionkey } = req.session.service;
            const { secondaryClient } = req.query;
            const params = {
                method: 'chart.gettopartists',
                api_key: JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientId
                    : LastFmTools.clientId,
                format: 'json',
                page: '1',
                sk: sessionkey,
            };
            // @ts-ignore
            params.api_sig = LastFmTools.createSignature(
                params,
                JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientSecret
                    : LastFmTools.clientSecret,
            );
            const response = await axios.get('https://ws.audioscrobbler.com/2.0', { params });
            const {
                artists: { artist },
            } = response.data;
            // Map to Artist type
            const artists: Artist[] = artist.map((artist: any) => ({
                type: 'artist',
                id: artist.mbid,
                name: artist.name,
                image: artist.image[3]['#text'],
                provider: 'lastfm',
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
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { sessionkey } = req.session.service;
            const { secondaryClient } = req.query;
            const params = {
                method: 'chart.gettoptracks',
                api_key: JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientId
                    : LastFmTools.clientId,
                format: 'json',
                page: '1',
                sk: sessionkey,
            };
            // @ts-ignore
            params.api_sig = LastFmTools.createSignature(
                params,
                JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientSecret
                    : LastFmTools.clientSecret,
            );
            const response = await axios.get('https://ws.audioscrobbler.com/2.0', { params });
            const {
                tracks: { track },
            } = response.data;
            // Map to Track type
            const tracks: Track[] = track.map((track: any) => ({
                type: 'track',
                id: track.mbid,
                name: track.name,
                image: track.image[3]['#text'],
                provider: 'lastfm',
                artist: track.artist.name,
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
            if (!req.session.service) {
                return res.status(400).json({
                    error: 'No service selected',
                });
            }
            const { sessionkey } = req.session.service;
            const { secondaryClient } = req.query;
            const params = {
                method: 'chart.gettopalbums',
                api_key: JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientId
                    : LastFmTools.clientId,
                format: 'json',
                page: '1',
                sk: sessionkey,
            };
            // @ts-ignore
            params.api_sig = LastFmTools.createSignature(
                params,
                JSON.parse((secondaryClient as string) || 'false')
                    ? LastFmTools.secondaryClientSecret
                    : LastFmTools.clientSecret,
            );
            const response = await axios.get('https://ws.audioscrobbler.com/2.0', { params });
            const {
                albums: { album },
            } = response.data;
            // Map to Album type
            const albums: Album[] = album.map((album: any) => ({
                type: 'album',
                id: album.mbid,
                name: album.name,
                image: album.image[3]['#text'],
                provider: 'lastfm',
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
