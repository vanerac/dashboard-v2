/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loginRequest } from '../models/loginRequest';
import type { loginResponse } from '../models/loginResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthenticationService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a token
     * Login and retrieve a token
     * @param requestBody Login and password
     * @returns loginResponse Success
     * @throws ApiError
     */
    public login(
        requestBody: loginRequest,
    ): CancelablePromise<loginResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Register a new user
     * Register a new user
     * @param requestBody Register a new user
     * @returns any Success
     * @throws ApiError
     */
    public register(
        requestBody: {
            email: string;
            password: string;
            displayName: string;
        },
    ): CancelablePromise<{
        message: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                409: `Conflict`,
                500: `Internal server error`,
            },
        });
    }

}
