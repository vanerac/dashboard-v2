/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Service = {
    id: string;
    type: 'google' | 'spotify' | 'apple' | 'deezer' | 'lastfm';
    enabled: boolean;
    accountName: string;
};
