/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceResponse } from '../models/ServiceResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ServicesService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all user services
     * Retrieves a list of all the user's connected services
     * @returns ServiceResponse Success
     * @throws ApiError
     */
    public getAllUserServices(): CancelablePromise<ServiceResponse> {
        return this.httpRequest.request({
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
    public getServicesById(
        serviceId: string,
    ): CancelablePromise<ServiceResponse> {
        return this.httpRequest.request({
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
    public deleteService(
        serviceId: string,
    ): CancelablePromise<ServiceResponse> {
        return this.httpRequest.request({
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
    public updateService(
        serviceId: string,
        requestBody: {
            enabled?: boolean;
        },
    ): CancelablePromise<ServiceResponse> {
        return this.httpRequest.request({
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

    /**
     * Disable user service
     * Disables a user service
     * @param serviceId Service ID
     * @returns ServiceResponse Success
     * @throws ApiError
     */
    public toggleService(
        serviceId: string,
    ): CancelablePromise<ServiceResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/service/{serviceId}/toggle',
            path: {
                'serviceId': serviceId,
            },
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }

}