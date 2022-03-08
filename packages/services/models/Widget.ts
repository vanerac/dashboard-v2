/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Widget = {
    id: string;
    serviceId: string;
    'x': number;
    'y': number;
    width: number;
    height: number;
    type: 'stat' | 'album' | 'playlist' | 'artist' | 'search';
    data: string;
    createdAt: string;
    editedAt: string;
};
