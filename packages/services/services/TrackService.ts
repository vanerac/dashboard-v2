/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { getTrackAlbumResponse } from '../models/getTrackAlbumResponse';
import type { getTrackArtistResponse } from '../models/getTrackArtistResponse';
import type { getTrackResponse } from '../models/getTrackResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TrackService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get track by ID
     * Get track by ID
     * @param trackId Track ID
     * @param serviceId ID of service to return playlists for
     * @returns getTrackResponse Successful operation
     * @throws ApiError
     */
    public getTrackById(
        trackId: string,
        serviceId: string,
    ): CancelablePromise<getTrackResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/track/{trackId}',
            path: {
                'trackId': trackId,
                'serviceId': serviceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Like track
     * Like track
     * @param trackId Track ID
     * @param serviceId ID of service to return playlists for
     * @returns getTrackResponse Successful operation
     * @throws ApiError
     */
    public likeTrack(
        trackId: string,
        serviceId: string,
    ): CancelablePromise<getTrackResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/data/{serviceId}/track/{trackId}/like',
            path: {
                'trackId': trackId,
                'serviceId': serviceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Unlike track
     * Unlike track
     * @param trackId Track ID
     * @param serviceId ID of service to return playlists for
     * @returns getTrackResponse Successful operation
     * @throws ApiError
     */
    public unlikeTrack(
        trackId: string,
        serviceId: string,
    ): CancelablePromise<getTrackResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/data/{serviceId}/track/{trackId}/unlike',
            path: {
                'trackId': trackId,
                'serviceId': serviceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get track album
     * Get track album
     * @param trackId Track ID
     * @param serviceId ID of service to return playlists for
     * @returns getTrackAlbumResponse Successful operation
     * @throws ApiError
     */
    public getTrackAlbum(
        trackId: string,
        serviceId: string,
    ): CancelablePromise<getTrackAlbumResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/track/{trackId}/album',
            path: {
                'trackId': trackId,
                'serviceId': serviceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get track artist
     * Get track artist
     * @param trackId Track ID
     * @param serviceId ID of service to return playlists for
     * @returns getTrackArtistResponse Successful operation
     * @throws ApiError
     */
    public getTrackArtist(
        trackId: string,
        serviceId: string,
    ): CancelablePromise<getTrackArtistResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/track/{trackId}/artists',
            path: {
                'trackId': trackId,
                'serviceId': serviceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}