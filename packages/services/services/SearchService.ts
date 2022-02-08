/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { searchQueryResponse } from '../models/searchQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchService {

    /**
     * Search
     * Search
     * @param q Search query
     * @returns searchQueryResponse Successful operation
     * @throws ApiError
     */
    public static searchGet(
        q: any,
    ): CancelablePromise<searchQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/{serviceId}/search',
            query: {
                'q': q,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

}