import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AlbumService } from './services/AlbumService';
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
declare type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export declare class ApiClient {
    readonly album: AlbumService;
    readonly artist: ArtistService;
    readonly authentication: AuthenticationService;
    readonly devices: DevicesService;
    readonly playback: PlaybackService;
    readonly playlist: PlaylistService;
    readonly search: SearchService;
    readonly services: ServicesService;
    readonly sso: SsoService;
    readonly stats: StatsService;
    readonly track: TrackService;
    readonly widget: WidgetService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}
export {};
//# sourceMappingURL=client.d.ts.map