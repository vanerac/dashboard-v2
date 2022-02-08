/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceResponse } from '../models/ServiceResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServicesService {

    /**
     * Get all user services
     * Retrieves a list of all the user's connected services
     * @returns ServiceResponse Success
     * @throws ApiError
     */
    public static getAllUserServices(): CancelablePromise<ServiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/service',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get user services
     * Retrieves a list of the user's connected services
     * @param serviceId Service ID
     * @returns ServiceResponse Success
     * @throws ApiError
     */
    public static getServicesById(
        serviceId: string,
    ): CancelablePromise<ServiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/service/{serviceId}',
            path: {
                'serviceId': serviceId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Delete user service
     * Deletes a user service
     * @param serviceId Service ID
     * @returns ServiceResponse Success
     * @throws ApiError
     */
    public static deleteService(
        serviceId: string,
    ): CancelablePromise<ServiceResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/service/{serviceId}/delete',
            path: {
                'serviceId': serviceId,
            },
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Update user service
     * Updates a user service
     * @param serviceId Service ID
     * @param requestBody
     * @returns ServiceResponse Success
     * @throws ApiError
     */
    public static updateService(
        serviceId: string,
        requestBody: {
            enabled?: boolean;
        },
    ): CancelablePromise<ServiceResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/service/{serviceId}/update',
            path: {
                'serviceId': serviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }

}