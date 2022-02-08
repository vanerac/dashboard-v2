/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Album } from './Album';
import type { Artist } from './Artist';
import type { Playlist } from './Playlist';
import type { Track } from './Track';

export type SearchResult = Array<(Track | Album | Artist | Playlist)>;