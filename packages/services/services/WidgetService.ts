/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Widget } from '../models/Widget';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WidgetService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns Widget A successful response.
     * @throws ApiError
     */
    public getAllWidgets(): CancelablePromise<Array<Widget>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/widget',
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param widgetId The widget id
     * @returns Widget A successful response.
     * @throws ApiError
     */
    public getWidgetById(
        widgetId: string,
    ): CancelablePromise<Widget> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/widget/{widgetId}',
            path: {
                'widgetId': widgetId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param widgetId The widget id
     * @returns Widget A successful response.
     * @throws ApiError
     */
    public deleteWidget(
        widgetId: string,
    ): CancelablePromise<Array<Widget>> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/widget/{widgetId}/delete',
            path: {
                'widgetId': widgetId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param widgetId The widget id
     * @param requestBody
     * @returns Widget A successful response.
     * @throws ApiError
     */
    public updateWidget(
        widgetId: string,
        requestBody?: {
            'x'?: number;
            'y'?: number;
            width?: number;
            height?: number;
            data?: string;
        },
    ): CancelablePromise<Array<Widget>> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/widget/{widgetId}/update',
            path: {
                'widgetId': widgetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Widget A successful response.
     * @throws ApiError
     */
    public createWidget(
        requestBody?: {
            serviceId?: string;
            'x'?: number;
            'y'?: number;
            width?: number;
            height?: number;
            type?: 'stat' | 'album' | 'playlist' | 'artist' | 'search';
            data?: string;
        },
    ): CancelablePromise<Array<Widget>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/widget/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Widget A successful response.
     * @throws ApiError
     */
    public updateBulk(
        requestBody?: Array<{
            id?: string;
            'x'?: number;
            'y'?: number;
            width?: number;
            height?: number;
        }>,
    ): CancelablePromise<Array<Widget>> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/widget/update-bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }

}