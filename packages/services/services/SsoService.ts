/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loginResponse } from '../models/loginResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SsoService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Redirects to SSO Auth screen
     * Redirects to SSO Auth screen
     * @returns void
     * @throws ApiError
     */
    public consentSso(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/google/login',
            errors: {
                308: `Redirects to auth consent screen`,
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
    public authCodeSso(
        code: string,
    ): CancelablePromise<loginResponse> {
        return this.httpRequest.request({
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