/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { searchQueryResponse } from '../models/searchQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SearchService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Search
     * Search
     * @param serviceId ID of service to return playlists for
     * @param q Search query
     * @returns searchQueryResponse Successful operation
     * @throws ApiError
     */
    public searchGet(
        serviceId: string,
        q: string,
    ): CancelablePromise<searchQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/{serviceId}/search',
            path: {
                'serviceId': serviceId,
            },
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