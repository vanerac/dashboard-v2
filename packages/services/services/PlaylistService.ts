/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { getTrackResponse } from '../models/getTrackResponse';
import type { playlistCreateRequest } from '../models/playlistCreateRequest';
import type { playlistSingleResponse } from '../models/playlistSingleResponse';
import type { playlistsResponse } from '../models/playlistsResponse';
import type { playlistTracksResponse } from '../models/playlistTracksResponse';
import type { playlistUpdateRequest } from '../models/playlistUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PlaylistService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all playlists
     * Get all playlists
     * @param serviceId ID of service to return playlists for
     * @returns playlistsResponse Successful operation
     * @throws ApiError
     */
    public getAllPlaylists(
        serviceId: string,
    ): CancelablePromise<playlistsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/playlist/',
            path: {
                'serviceId': serviceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get playlist by id
     * Get playlist by id
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist id
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public getPlaylistById(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistSingleResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/playlist/{playlistId}',
            path: {
                'serviceId': serviceId,
                'playlistId': playlistId,
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
     * Get playlist tracks
     * Get playlist tracks
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist id
     * @returns playlistTracksResponse Successful operation
     * @throws ApiError
     */
    public getPlaylistTracks(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistTracksResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/playlist/{playlistId}/tracks',
            path: {
                'serviceId': serviceId,
                'playlistId': playlistId,
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
     * Create playlist
     * Create playlist
     * @param serviceId ID of service to return playlists for
     * @param requestBody
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public create(
        serviceId: string,
        requestBody?: playlistCreateRequest,
    ): CancelablePromise<playlistSingleResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/data/{serviceId}/playlist/create',
            path: {
                'serviceId': serviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update playlist
     * Update playlist
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist id
     * @param requestBody
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public update(
        serviceId: string,
        playlistId: string,
        requestBody?: playlistUpdateRequest,
    ): CancelablePromise<playlistSingleResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/data/{serviceId}/playlist/{playlistId}/update',
            path: {
                'serviceId': serviceId,
                'playlistId': playlistId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete playlist
     * Delete playlist
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist id
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public delete(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistSingleResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/data/{serviceId}/playlist/{playlistId}/delete',
            path: {
                'serviceId': serviceId,
                'playlistId': playlistId,
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
     * Save playlist
     * Save playlist
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist id
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public save(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistSingleResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/playlist/{playlistId}/save',
            path: {
                'serviceId': serviceId,
                'playlistId': playlistId,
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
     * Unsave playlist
     * Unsave playlist
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist id
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public unsave(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistSingleResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/playlist/{playlistId}/unsave',
            path: {
                'serviceId': serviceId,
                'playlistId': playlistId,
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
     * Add track to playlist
     * Add track to playlist
     * @param trackId Playlist ID
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist ID
     * @returns getTrackResponse Successful operation
     * @throws ApiError
     */
    public addToPlaylist(
        trackId: string,
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<getTrackResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/data/{serviceId}/track/{trackId}/addToPlaylist/{playlistId}',
            path: {
                'trackId': trackId,
                'serviceId': serviceId,
                'playlistId': playlistId,
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
     * Remove track from playlist
     * Remove track from playlist
     * @param trackId Track ID
     * @param serviceId ID of service to return playlists for
     * @param playlistId Playlist ID
     * @returns getTrackResponse Successful operation
     * @throws ApiError
     */
    public removeFromPlaylist(
        trackId: string,
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<getTrackResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/data/{serviceId}/track/{trackId}/removeFromPlaylist/{playlistId}',
            path: {
                'trackId': trackId,
                'serviceId': serviceId,
                'playlistId': playlistId,
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