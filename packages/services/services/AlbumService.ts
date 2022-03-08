/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from '../models/Album';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AlbumService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all saved albums
     * Get all saved albums
     * @param serviceId ID of service to return playlists for
     * @returns Album Artist found
     * @throws ApiError
     */
    public getAllSavedAlbums(
        serviceId: string,
    ): CancelablePromise<Array<Album>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/album/',
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
     * Get album by id
     * Get album by id
     * @param albumId Album id
     * @param serviceId ID of service to return playlists for
     * @returns Album Album found
     * @throws ApiError
     */
    public getById(
        albumId: string,
        serviceId: string,
    ): CancelablePromise<Album> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/album/{albumId}',
            path: {
                'albumId': albumId,
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
     * Save album
     * Save album
     * @param albumId Album id
     * @param serviceId ID of service to return playlists for
     * @returns Album Album saved
     * @throws ApiError
     */
    public saveAlbum(
        albumId: string,
        serviceId: string,
    ): CancelablePromise<Album> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/data/{serviceId}/album/save/{albumId}',
            path: {
                'albumId': albumId,
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
     * Unsave album
     * Unsave album
     * @param albumId Album id
     * @param serviceId ID of service to return playlists for
     * @returns Album Album unsaved
     * @throws ApiError
     */
    public unsaveAlbum(
        albumId: string,
        serviceId: string,
    ): CancelablePromise<Album> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/data/{serviceId}/album/unsave/{albumId}',
            path: {
                'albumId': albumId,
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