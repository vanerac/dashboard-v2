/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { ArtistService } from './services/ArtistService';
import { AuthenticationService } from './services/AuthenticationService';
import { DevicesService } from './services/DevicesService';
import { PlaybackService } from './services/PlaybackService';
import { PlaylistService } from './services/PlaylistService';
import { SearchService } from './services/SearchService';
import { ServicesService } from './services/ServicesService';
import { SsoService } from './services/SsoService';
import { StatsService } from './services/StatsService';
import { TrackService } from './services/TrackService';
import { WidgetService } from './services/WidgetService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiClient {

    public readonly artist: ArtistService;
    public readonly authentication: AuthenticationService;
    public readonly devices: DevicesService;
    public readonly playback: PlaybackService;
    public readonly playlist: PlaylistService;
    public readonly search: SearchService;
    public readonly services: ServicesService;
    public readonly sso: SsoService;
    public readonly stats: StatsService;
    public readonly track: TrackService;
    public readonly widget: WidgetService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:8080/api',
            VERSION: config?.VERSION ?? '3.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.artist = new ArtistService(this.request);
        this.authentication = new AuthenticationService(this.request);
        this.devices = new DevicesService(this.request);
        this.playback = new PlaybackService(this.request);
        this.playlist = new PlaylistService(this.request);
        this.search = new SearchService(this.request);
        this.services = new ServicesService(this.request);
        this.sso = new SsoService(this.request);
        this.stats = new StatsService(this.request);
        this.track = new TrackService(this.request);
        this.widget = new WidgetService(this.request);
    }
}