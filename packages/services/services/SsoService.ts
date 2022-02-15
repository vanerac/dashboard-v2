/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loginResponse } from '../models/loginResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SsoService {

    /**
     * Redirects to SSO Auth screen
     * Redirects to SSO Auth screen
     * @returns void
     * @throws ApiError
     */
    public static authSso(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/sso/google/login',
            errors: {
                302: `Redirects to auth consent screen`,
            },
        });
    }

    /**
     * Assign token tu user and/or login to user account
     * Assign token tu user and/or login to user account
     * @param code Auth code returned by provider
     * @returns loginResponse Success
     * @throws ApiError
     */
    public static authRegisterPost(
        code: string,
    ): CancelablePromise<loginResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/sso/google/callback',
            query: {
                'code': code,
            },
            errors: {
                400: `Bad request`,
                500: `Internal server error`,
            },
        });
    }

}