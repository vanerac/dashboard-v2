/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlbumStats } from '../models/AlbumStats';
import type { ArtistStats } from '../models/ArtistStats';
import type { TagStats } from '../models/TagStats';
import type { TrackStats } from '../models/TrackStats';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StatsService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get my top artists
     * Get my top artists
     * @param limit Limit
     * @param offset Offset
     * @returns ArtistStats Success
     * @throws ApiError
     */
    public getMyTopArtists(
        limit?: number,
        offset?: number,
    ): CancelablePromise<ArtistStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/artists',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get my top tracks
     * Get my top tracks
     * @param limit Limit
     * @param offset Offset
     * @returns TrackStats Success
     * @throws ApiError
     */
    public getMyTopTracks(
        limit?: number,
        offset?: number,
    ): CancelablePromise<TrackStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/tracks',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get my top albums
     * Get my top albums
     * @param limit Limit
     * @param offset Offset
     * @returns AlbumStats Success
     * @throws ApiError
     */
    public getMyTopAlbums(
        limit?: number,
        offset?: number,
    ): CancelablePromise<AlbumStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/albums',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get my top tags
     * Get my top tags
     * @param limit Limit
     * @param offset Offset
     * @returns TagStats Success
     * @throws ApiError
     */
    public getMyTopTags(
        limit?: number,
        offset?: number,
    ): CancelablePromise<TagStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/tags',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get global top artists
     * Get global top artists
     * @param limit Limit
     * @param offset Offset
     * @returns ArtistStats Success
     * @throws ApiError
     */
    public getGlobalTopArtists(
        limit?: number,
        offset?: number,
    ): CancelablePromise<ArtistStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/charts/top/artists/weekly',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get global top tracks
     * Get global top tracks
     * @param limit Limit
     * @param offset Offset
     * @returns TrackStats Success
     * @throws ApiError
     */
    public getGlobalTopTracks(
        limit?: number,
        offset?: number,
    ): CancelablePromise<TrackStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/charts/top/tracks/weekly',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get global top albums
     * Get global top albums
     * @param limit Limit
     * @param offset Offset
     * @returns AlbumStats Success
     * @throws ApiError
     */
    public getGlobalTopAlbums(
        limit?: number,
        offset?: number,
    ): CancelablePromise<AlbumStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/charts/top/albums/weekly',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

}