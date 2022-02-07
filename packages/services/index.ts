/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { AddToQueueRequest } from './models/AddToQueueRequest';
export type { AddToQueueResponse } from './models/AddToQueueResponse';
export type { ClearQueueResponse } from './models/ClearQueueResponse';
export type { Device } from './models/Device';
export type { Error } from './models/Error';
export type { GetAllDevicesResponse } from './models/GetAllDevicesResponse';
export type { GetCurrentDeviceResponse } from './models/GetCurrentDeviceResponse';
export type { GetQueueResponse } from './models/GetQueueResponse';
export type { MoveInQueueRequest } from './models/MoveInQueueRequest';
export type { MoveInQueueResponse } from './models/MoveInQueueResponse';
export type { PauseResponse } from './models/PauseResponse';
export { PlaybackStateResponse } from './models/PlaybackStateResponse';
export { PlaybackStatus } from './models/PlaybackStatus';
export type { Playlist } from './models/Playlist';
export type { playlistCreateRequest } from './models/playlistCreateRequest';
export type { PlaylistResponse } from './models/PlaylistResponse';
export type { playlistSingleResponse } from './models/playlistSingleResponse';
export type { playlistsResponse } from './models/playlistsResponse';
export type { playlistTracksResponse } from './models/playlistTracksResponse';
export type { playlistUpdateRequest } from './models/playlistUpdateRequest';
export type { PlayTrackRequest } from './models/PlayTrackRequest';
export type { PlayTrackResponse } from './models/PlayTrackResponse';
export type { PrevResponse } from './models/PrevResponse';
export type { RegisterDeviceRequest } from './models/RegisterDeviceRequest';
export type { RegisterDeviceResponse } from './models/RegisterDeviceResponse';
export type { RemoveFromQueueRequest } from './models/RemoveFromQueueRequest';
export type { RemoveFromQueueResponse } from './models/RemoveFromQueueResponse';
export type { ResumeResponse } from './models/ResumeResponse';
export type { SeekRequest } from './models/SeekRequest';
export type { SeekResponse } from './models/SeekResponse';
export { Service } from './models/Service';
export type { ServiceResponse } from './models/ServiceResponse';
export type { SetCurrentDeviceRequest } from './models/SetCurrentDeviceRequest';
export type { SetCurrentDeviceResponse } from './models/SetCurrentDeviceResponse';
export type { SetQualityRequest } from './models/SetQualityRequest';
export type { SetQualityResponse } from './models/SetQualityResponse';
export type { SetRepeatRequest } from './models/SetRepeatRequest';
export type { SetRepeatResponse } from './models/SetRepeatResponse';
export type { SetShuffleRequest } from './models/SetShuffleRequest';
export type { SetShuffleResponse } from './models/SetShuffleResponse';
export type { SetVolumeRequest } from './models/SetVolumeRequest';
export type { SetVolumeResponse } from './models/SetVolumeResponse';
export type { SkipResponse } from './models/SkipResponse';
export type { Track } from './models/Track';
export type { User } from './models/User';

export { AuthenticationService } from './services/AuthenticationService';
export { PlaybackService } from './services/PlaybackService';
export { PlaylistService } from './services/PlaylistService';
export { ServicesService } from './services/ServicesService';
