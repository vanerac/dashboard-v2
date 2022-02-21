/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loginResponse } from '../models/loginResponse';
import type { ssoUrl } from '../models/ssoUrl';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SsoService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Redirects to SSO Auth screen
     * Redirects to SSO Auth screen
     * @param callbackUrl A callback URL to redirect to after SSO authentication
     * @returns ssoUrl Success
     * @throws ApiError
     */
    public googleConsentSso(
        callbackUrl?: string,
    ): CancelablePromise<ssoUrl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/google/login',
            query: {
                'callbackURL': callbackUrl,
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
    public googleAuthCodeSso(
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

    /**
     * Redirects to SSO Auth screen
     * Redirects to SSO Auth screen
     * @param callbackUrl A callback URL to redirect to after SSO authentication
     * @returns ssoUrl Success
     * @throws ApiError
     */
    public spotifyConsentSso(
        callbackUrl?: string,
    ): CancelablePromise<ssoUrl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/spotify/login',
            query: {
                'callbackURL': callbackUrl,
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
    public spotifyAuthCodeSso(
        code: string,
    ): CancelablePromise<loginResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/spotify/callback',
            query: {
                'code': code,
            },
            errors: {
                400: `Bad request`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Redirects to SSO Auth screen
     * Redirects to SSO Auth screen
     * @param callbackUrl A callback URL to redirect to after SSO authentication
     * @returns ssoUrl Success
     * @throws ApiError
     */
    public deezerConsentSso(
        callbackUrl?: string,
    ): CancelablePromise<ssoUrl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/deezer/login',
            query: {
                'callbackURL': callbackUrl,
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
    public deezerAuthCodeSso(
        code: string,
    ): CancelablePromise<loginResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/deezer/callback',
            query: {
                'code': code,
            },
            errors: {
                400: `Bad request`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Redirects to SSO Auth screen
     * Redirects to SSO Auth screen
     * @param callbackUrl A callback URL to redirect to after SSO authentication
     * @returns ssoUrl Success
     * @throws ApiError
     */
    public lastfmConsentSso(
        callbackUrl?: string,
    ): CancelablePromise<ssoUrl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/lastfm/login',
            query: {
                'callbackURL': callbackUrl,
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
    public lastfmAuthCodeSso(
        code: string,
    ): CancelablePromise<loginResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/sso/lastfm/callback',
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