/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlaybackService {

    /**
     * Get current playback state
     * Get current playback state
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getCurrentState(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/currentState',
        });
    }

    /**
     * Get queue
     * Get queue
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getQueue(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/queue',
        });
    }

    /**
     * Add to queue
     * Add to queue
     * @returns any Successful operation
     * @throws ApiError
     */
    public static addToQueue(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/queue/add',
        });
    }

    /**
     * Remove from queue
     * Remove from queue
     * @returns any Successful operation
     * @throws ApiError
     */
    public static removeFromQueue(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/queue/delete',
        });
    }

    /**
     * Clear queue
     * Clear queue
     * @returns any Successful operation
     * @throws ApiError
     */
    public static clearQueue(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/playback/queue/clear',
        });
    }

    /**
     * Move in queue
     * Move in queue
     * @returns any Successful operation
     * @throws ApiError
     */
    public static moveInQueue(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/playback/queue/move',
        });
    }

    /**
     * Play track
     * Play track
     * @returns any Successful operation
     * @throws ApiError
     */
    public static playTrack(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/play',
        });
    }

    /**
     * Pause
     * Pause
     * @returns any Successful operation
     * @throws ApiError
     */
    public static pause(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/pause',
        });
    }

    /**
     * Resume
     * Resume
     * @returns any Successful operation
     * @throws ApiError
     */
    public static resume(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/resume',
        });
    }

    /**
     * Skip
     * Skip
     * @returns any Successful operation
     * @throws ApiError
     */
    public static skip(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/skip',
        });
    }

    /**
     * Previous
     * Previous
     * @returns any Successful operation
     * @throws ApiError
     */
    public static prev(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/prev',
        });
    }

    /**
     * Seek
     * Seek
     * @returns any Successful operation
     * @throws ApiError
     */
    public static seek(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/seek',
        });
    }

    /**
     * Set volume
     * Set volume
     * @returns any Successful operation
     * @throws ApiError
     */
    public static setVolume(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/volume',
        });
    }

    /**
     * Set shuffle
     * Set shuffle
     * @returns any Successful operation
     * @throws ApiError
     */
    public static setShuffle(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/shuffle',
        });
    }

    /**
     * Set repeat
     * Set repeat
     * @returns any Successful operation
     * @throws ApiError
     */
    public static setRepeat(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/repeat',
        });
    }

    /**
     * Set quality
     * Set quality
     * @returns any Successful operation
     * @throws ApiError
     */
    public static setQuality(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/quality',
        });
    }

}