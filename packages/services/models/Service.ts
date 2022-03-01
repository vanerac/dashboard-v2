/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Service = {
    id: string;
    provider: 'google' | 'spotify' | 'apple' | 'deezer' | 'lastfm';
    enabled: boolean;
    accountName: string;
};
