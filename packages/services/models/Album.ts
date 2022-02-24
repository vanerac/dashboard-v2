/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Album = {
    type?: 'artist' | 'album' | 'track' | 'playlist';
    id?: string;
    name?: string;
    artist?: string;
    image?: string;
    provider?: string;
};
