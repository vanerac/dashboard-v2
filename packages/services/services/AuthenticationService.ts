/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { paths_1auth_1login_post_responses_200_content_application_1json_schema_properties_user } from '../models/paths_1auth_1login_post_responses_200_content_application_1json_schema_properties_user';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticationService {

    /**
     * Get a token
     * Login and retrieve a token
     * @param requestBody Login and password
     * @returns any Success
     * @throws ApiError
     */
    public static authLoginPost(
        requestBody: {
            email: string;
            password: string;
        },
    ): CancelablePromise<{
        token: string;
        user?: {
            email?: string;
            displayName?: string;
            id?: number;
        };
    }> {
        return __request(OpenAPI, {
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
    public static authRegisterPost(
        requestBody: {
            email: string;
            password: string;
        },
    ): CancelablePromise<{
        user: paths_1auth_1login_post_responses_200_content_application_1json_schema_properties_user;
        message: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                500: `Internal server error`,
            },
        });
    }

}