/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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

}