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
     * @param serviceId ID of service to return playlists for
     * @returns playlistsResponse Successful operation
     * @throws ApiError
     */
    public static getAllPlaylists(
        serviceId: string,
    ): CancelablePromise<playlistsResponse> {
        return __request(OpenAPI, {
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
    public static getPlaylistById(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
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
    public static getPlaylistTracks(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistTracksResponse> {
        return __request(OpenAPI, {
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
    public static create(
        serviceId: string,
        requestBody?: playlistCreateRequest,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
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
    public static update(
        serviceId: string,
        playlistId: string,
        requestBody?: playlistUpdateRequest,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
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
    public static delete(
        serviceId: string,
        playlistId: string,
    ): CancelablePromise<playlistSingleResponse> {
        return __request(OpenAPI, {
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