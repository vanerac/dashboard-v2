/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlaylistService {

    /**
     * Get all playlists
     * Get all playlists
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getAllPlaylists(): CancelablePromise<any> {
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
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getPlaylistById(
        playlistId: any,
    ): CancelablePromise<any> {
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
     * Create playlist
     * Create playlist
     * @returns any Successful operation
     * @throws ApiError
     */
    public static create(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data/{serviceId}/playlist/create',
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
     * @returns any Successful operation
     * @throws ApiError
     */
    public static update(
        id: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/{serviceId}/playlist/{playlistId}/update',
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

    /**
     * Delete playlist
     * Delete playlist
     * @param id Playlist id
     * @returns any Successful operation
     * @throws ApiError
     */
    public static delete(
        id: any,
    ): CancelablePromise<any> {
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