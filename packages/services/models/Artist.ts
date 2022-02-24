/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Artist = {
    type?: 'artist' | 'album' | 'track' | 'playlist';
    id: string;
    name: string;
    image: string;
    provider: string;
    followers: number;
    external_urls: string;
};
