/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { getArtistAlbumsResponse } from '../models/getArtistAlbumsResponse';
import type { getArtistsResponse } from '../models/getArtistsResponse';
import type { getArtistTopTracksResponse } from '../models/getArtistTopTracksResponse';
import type { getSingleArtist } from '../models/getSingleArtist';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ArtistService {

    /**
     * Get artist by ID
     * Get artist by ID
     * @param serviceId ID of service to return playlists for
     * @param artistId ID of artist to return
     * @returns getSingleArtist Artist found
     * @throws ApiError
     */
    public static getArtistById(
        serviceId: any,
        artistId: any,
    ): CancelablePromise<getSingleArtist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/artist/{artistId}',
            path: {
                'serviceId': serviceId,
                'artistId': artistId,
            },
            errors: {
                404: `Artist not found`,
            },
        });
    }

    /**
     * Get artist albums
     * Get artist albums
     * @param serviceId ID of service to return playlists for
     * @param artistId ID of artist to return albums for
     * @param limit Limit of albums to return
     * @param offset Offset of albums to return
     * @returns getArtistAlbumsResponse Artist albums found
     * @throws ApiError
     */
    public static getArtistAlbums(
        serviceId: any,
        artistId: any,
        limit?: any,
        offset?: any,
    ): CancelablePromise<getArtistAlbumsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/artist/{artistId}/albums',
            path: {
                'serviceId': serviceId,
                'artistId': artistId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `Artist not found`,
            },
        });
    }

    /**
     * Get artist top tracks
     * Get artist top tracks
     * @param serviceId ID of service to return playlists for
     * @param artistId ID of artist to return top tracks for
     * @param country Country to return top tracks for
     * @param limit Limit of top tracks to return
     * @param offset Offset of top tracks to return
     * @returns getArtistTopTracksResponse Artist top tracks found
     * @throws ApiError
     */
    public static getArtistTopTracks(
        serviceId: any,
        artistId: any,
        country?: any,
        limit?: any,
        offset?: any,
    ): CancelablePromise<getArtistTopTracksResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/artist/{artistId}/top-tracks',
            path: {
                'serviceId': serviceId,
                'artistId': artistId,
            },
            query: {
                'country': country,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `Artist not found`,
            },
        });
    }

    /**
     * Get artist related artists
     * Get artist related artists
     * @param serviceId ID of service to return playlists for
     * @param artistId ID of artist to return related artists for
     * @param limit Limit of related artists to return
     * @param offset Offset of related artists to return
     * @returns getArtistsResponse Artist related artists found
     * @throws ApiError
     */
    public static getArtistRelatedArtists(
        serviceId: any,
        artistId: any,
        limit?: any,
        offset?: any,
    ): CancelablePromise<getArtistsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/artist/{artistId}/related',
            path: {
                'serviceId': serviceId,
                'artistId': artistId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `Artist not found`,
            },
        });
    }

    /**
     * Follow artist
     * Follow artist
     * @param serviceId ID of service to return playlists for
     * @param artistId ID of artist to follow
     * @returns getSingleArtist Artist followed
     * @throws ApiError
     */
    public static followArtist(
        serviceId: any,
        artistId: any,
    ): CancelablePromise<getSingleArtist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/artist/{artistId}/follow',
            path: {
                'serviceId': serviceId,
                'artistId': artistId,
            },
            errors: {
                404: `Artist not found`,
                409: `Artist already followed`,
            },
        });
    }

    /**
     * Unfollow artist
     * Unfollow artist
     * @param serviceId ID of service to return playlists for
     * @param artistId ID of artist to unfollow
     * @returns getSingleArtist Artist unfollowed
     * @throws ApiError
     */
    public static unfollowArtist(
        serviceId: any,
        artistId: any,
    ): CancelablePromise<getSingleArtist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/artist/{artistId}/unfollow',
            path: {
                'serviceId': serviceId,
                'artistId': artistId,
            },
            errors: {
                404: `Artist not found`,
                409: `Artist not followed`,
            },
        });
    }

    /**
     * Get followed artists
     * Get followed artists
     * @param serviceId ID of service to return playlists for
     * @param limit Limit of artists to return
     * @param offset Offset of artists to return
     * @returns getArtistsResponse Followed artists found
     * @throws ApiError
     */
    public static getFollowedArtists(
        serviceId: any,
        limit?: any,
        offset?: any,
    ): CancelablePromise<getArtistsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/artist/followed',
            path: {
                'serviceId': serviceId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

}