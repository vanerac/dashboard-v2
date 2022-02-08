/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DevicesService {

    /**
     * Get all devices
     * Get all devices
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getAllDevices(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/devices',
        });
    }

    /**
     * Get current device
     * Get current device
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getCurrentDevice(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/device/current',
        });
    }

    /**
     * Set current device
     * Set current device
     * @returns any Successful operation
     * @throws ApiError
     */
    public static setCurrentDevice(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/playback/device/change',
        });
    }

    /**
     * Register device
     * Register device
     * @returns any Successful operation
     * @throws ApiError
     */
    public static registerDevice(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/device/register',
        });
    }

}