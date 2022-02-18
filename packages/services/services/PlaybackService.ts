/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddToQueueRequest } from "../models/AddToQueueRequest";
import type { AddToQueueResponse } from "../models/AddToQueueResponse";
import type { ClearQueueResponse } from "../models/ClearQueueResponse";
import type { GetQueueResponse } from "../models/GetQueueResponse";
import type { MoveInQueueRequest } from "../models/MoveInQueueRequest";
import type { MoveInQueueResponse } from "../models/MoveInQueueResponse";
import type { PauseResponse } from "../models/PauseResponse";
import type { PlaybackStateResponse } from "../models/PlaybackStateResponse";
import type { PlayTrackRequest } from "../models/PlayTrackRequest";
import type { PlayTrackResponse } from "../models/PlayTrackResponse";
import type { PrevResponse } from "../models/PrevResponse";
import type { RemoveFromQueueRequest } from "../models/RemoveFromQueueRequest";
import type { RemoveFromQueueResponse } from "../models/RemoveFromQueueResponse";
import type { ResumeResponse } from "../models/ResumeResponse";
import type { SeekResponse } from "../models/SeekResponse";
import type { SetQualityResponse } from "../models/SetQualityResponse";
import type { SetRepeatResponse } from "../models/SetRepeatResponse";
import type { SetShuffleResponse } from "../models/SetShuffleResponse";
import type { SetVolumeResponse } from "../models/SetVolumeResponse";
import type { SkipResponse } from "../models/SkipResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class PlaybackService {
  constructor(private readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get current playback state
   * Get current playback state
   * @returns PlaybackStateResponse Successful operation
   * @throws ApiError
   */
  public getCurrentState(): CancelablePromise<PlaybackStateResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/playback/currentState",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get queue
   * Get queue
   * @returns GetQueueResponse Successful operation
   * @throws ApiError
   */
  public getQueue(): CancelablePromise<GetQueueResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/playback/queue",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Add to queue
   * Add to queue
   * @param requestBody
   * @returns AddToQueueResponse Successful operation
   * @throws ApiError
   */
  public addToQueue(
    requestBody: AddToQueueRequest
  ): CancelablePromise<AddToQueueResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/queue/add",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Remove from queue
   * Remove from queue
   * @param requestBody
   * @returns RemoveFromQueueResponse Successful operation
   * @throws ApiError
   */
  public removeFromQueue(
    requestBody: RemoveFromQueueRequest
  ): CancelablePromise<RemoveFromQueueResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/queue/delete",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Clear queue
   * Clear queue
   * @returns ClearQueueResponse Successful operation
   * @throws ApiError
   */
  public clearQueue(): CancelablePromise<ClearQueueResponse> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/playback/queue/clear",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Move in queue
   * Move in queue
   * @param requestBody
   * @returns MoveInQueueResponse Successful operation
   * @throws ApiError
   */
  public moveInQueue(
    requestBody: MoveInQueueRequest
  ): CancelablePromise<MoveInQueueResponse> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/playback/queue/move",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Play track
   * Play track
   * @param requestBody
   * @returns PlayTrackResponse Successful operation
   * @throws ApiError
   */
  public playTrack(
    requestBody: PlayTrackRequest
  ): CancelablePromise<PlayTrackResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/play",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Pause
   * Pause
   * @returns PauseResponse Successful operation
   * @throws ApiError
   */
  public pause(): CancelablePromise<PauseResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/playback/pause",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Resume
   * Resume
   * @returns ResumeResponse Successful operation
   * @throws ApiError
   */
  public resume(): CancelablePromise<ResumeResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/playback/resume",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Skip
   * Skip
   * @returns SkipResponse Successful operation
   * @throws ApiError
   */
  public skip(): CancelablePromise<SkipResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/playback/skip",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Previous
   * Previous
   * @returns PrevResponse Successful operation
   * @throws ApiError
   */
  public prev(): CancelablePromise<PrevResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/playback/prev",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Seek
   * Seek
   * @param requestBody
   * @returns SeekResponse Successful operation
   * @throws ApiError
   */
  public seek(requestBody?: number): CancelablePromise<SeekResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/seek",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Set volume
   * Set volume
   * @param requestBody
   * @returns SetVolumeResponse Successful operation
   * @throws ApiError
   */
  public setVolume(
    requestBody?: boolean
  ): CancelablePromise<SetVolumeResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/volume",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Set shuffle
   * Set shuffle
   * @param requestBody
   * @returns SetShuffleResponse Successful operation
   * @throws ApiError
   */
  public setShuffle(
    requestBody?: boolean
  ): CancelablePromise<SetShuffleResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/shuffle",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Set repeat
   * Set repeat
   * @param requestBody
   * @returns SetRepeatResponse Successful operation
   * @throws ApiError
   */
  public setRepeat(
    requestBody?: boolean
  ): CancelablePromise<SetRepeatResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/repeat",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Set quality
   * Set quality
   * @param requestBody
   * @returns SetQualityResponse Successful operation
   * @throws ApiError
   */
  public setQuality(
    requestBody?: string
  ): CancelablePromise<SetQualityResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "/playback/quality",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }
}
