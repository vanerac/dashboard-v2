/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { playlistCreateRequest } from '../models/playlistCreateRequest';
import type { playlistSingleResponse } from '../models/playlistSingleResponse';
import type { playlistsResponse } from '../models/playlistsResponse';
import type { playlistTracksResponse } from '../models/playlistTracksResponse';
import type { playlistUpdateRequest } from '../models/playlistUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlaylistService {

    /**
     * Get all playlists
     * Get all playlists
     * @returns playlistsResponse Successful operation
     * @throws ApiError
     */
    public static getAllPlaylists(): CancelablePromise<playlistsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/playlist/',
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
     * @param playlistId Playlist id
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public static getPlaylistById(
        playlistId: string,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/playlist/{playlistId}',
            path: {
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
     * @param playlistId Playlist id
     * @returns playlistTracksResponse Successful operation
     * @throws ApiError
     */
    public static getPlaylistTracks(
        playlistId: string,
    ): CancelablePromise<playlistTracksResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/playlist/{playlistId}/tracks',
            path: {
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
     * @param requestBody
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public static create(
        requestBody?: playlistCreateRequest,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data/{serviceId}/playlist/create',
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
     * @param id Playlist id
     * @param requestBody
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public static update(
        id: string,
        requestBody?: playlistUpdateRequest,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/{serviceId}/playlist/{playlistId}/update',
            path: {
                'id': id,
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
     * @param id Playlist id
     * @returns playlistSingleResponse Successful operation
     * @throws ApiError
     */
    public static delete(
        id: string,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data/{serviceId}/playlist/{playlistId}/delete',
            path: {
                'id': id,
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