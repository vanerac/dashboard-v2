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
     * @param secondaryClientId use the secondary client ID to use for SSO authentication
     * @param limit Limit
     * @param offset Offset
     * @returns ArtistStats Success
     * @throws ApiError
     */
    public getMyTopArtists(
        secondaryClientId?: boolean,
        limit?: number,
        offset?: number,
    ): CancelablePromise<ArtistStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/artists',
            query: {
                'secondaryClientId': secondaryClientId,
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
     * @param secondaryClientId use the secondary client ID to use for SSO authentication
     * @param limit Limit
     * @param offset Offset
     * @returns TrackStats Success
     * @throws ApiError
     */
    public getMyTopTracks(
        secondaryClientId?: boolean,
        limit?: number,
        offset?: number,
    ): CancelablePromise<TrackStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/tracks',
            query: {
                'secondaryClientId': secondaryClientId,
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
     * @param secondaryClientId use the secondary client ID to use for SSO authentication
     * @param limit Limit
     * @param offset Offset
     * @returns AlbumStats Success
     * @throws ApiError
     */
    public getMyTopAlbums(
        secondaryClientId?: boolean,
        limit?: number,
        offset?: number,
    ): CancelablePromise<AlbumStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/albums',
            query: {
                'secondaryClientId': secondaryClientId,
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
     * @param secondaryClientId use the secondary client ID to use for SSO authentication
     * @param limit Limit
     * @param offset Offset
     * @returns TagStats Success
     * @throws ApiError
     */
    public getMyTopTags(
        secondaryClientId?: boolean,
        limit?: number,
        offset?: number,
    ): CancelablePromise<TagStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/me/top/tags',
            query: {
                'secondaryClientId': secondaryClientId,
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
     * @param secondaryClientId use the secondary client ID to use for SSO authentication
     * @param limit Limit
     * @param offset Offset
     * @returns ArtistStats Success
     * @throws ApiError
     */
    public getGlobalTopArtists(
        secondaryClientId?: boolean,
        limit?: number,
        offset?: number,
    ): CancelablePromise<ArtistStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/charts/top/artists/weekly',
            query: {
                'secondaryClientId': secondaryClientId,
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
     * @param secondaryClientId use the secondary client ID to use for SSO authentication
     * @param limit Limit
     * @param offset Offset
     * @returns TrackStats Success
     * @throws ApiError
     */
    public getGlobalTopTracks(
        secondaryClientId?: boolean,
        limit?: number,
        offset?: number,
    ): CancelablePromise<TrackStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/charts/top/tracks/weekly',
            query: {
                'secondaryClientId': secondaryClientId,
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