/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetAllDevicesResponse } from '../models/GetAllDevicesResponse';
import type { GetCurrentDeviceResponse } from '../models/GetCurrentDeviceResponse';
import type { RegisterDeviceRequest } from '../models/RegisterDeviceRequest';
import type { RegisterDeviceResponse } from '../models/RegisterDeviceResponse';
import type { SetCurrentDeviceRequest } from '../models/SetCurrentDeviceRequest';
import type { SetCurrentDeviceResponse } from '../models/SetCurrentDeviceResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DevicesService {

    /**
     * Get all devices
     * Get all devices
     * @returns GetAllDevicesResponse Successful operation
     * @throws ApiError
     */
    public static getAllDevices(): CancelablePromise<GetAllDevicesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/devices',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get current device
     * Get current device
     * @returns GetCurrentDeviceResponse Successful operation
     * @throws ApiError
     */
    public static getCurrentDevice(): CancelablePromise<GetCurrentDeviceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playback/device/current',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Set current device
     * Set current device
     * @param requestBody
     * @returns SetCurrentDeviceResponse Successful operation
     * @throws ApiError
     */
    public static setCurrentDevice(
        requestBody: SetCurrentDeviceRequest,
    ): CancelablePromise<SetCurrentDeviceResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/playback/device/change',
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
     * Register device
     * Register device
     * @param requestBody
     * @returns RegisterDeviceResponse Successful operation
     * @throws ApiError
     */
    public static registerDevice(
        requestBody: RegisterDeviceRequest,
    ): CancelablePromise<RegisterDeviceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playback/device/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

}