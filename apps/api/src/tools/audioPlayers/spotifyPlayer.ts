// @ts-nocheck
import { Track } from './playerManager.tools';
import 'puppeteer-stream';
import { EventEmitter } from 'events';
import path from 'path';
import { getStream, launch, Stream } from 'puppeteer-stream';
import axios from 'axios';
import { AudioPlayer } from './AudioPlayer';

const domFile = `file://${path.join(__dirname, 'playerDOM', 'spotifyPlayerDOM.html')}`;

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        player: any;
        ELEVATE: ($eventName: string, $data: any) => boolean;
    }
}

export default class SpotifyAudioPlayer extends AudioPlayer {
    // Todo:
    //  - is play on this device ?

    private deviceId: string | undefined;
    private eventManager: EventEmitter = new EventEmitter();

    constructor(token: string) {
        super(token);
        // super.token = token;

        // todo: bind events from eventManager to super

        this.init();
    }

    private async init() {
        await this.initPuppeteer(domFile);
        await this.initSpotify();
        await this.elevateEvents();
        await this.connectDevice();
    }

    // Todo: pass this in a AudioPlayer
    private async initPuppeteer(domPath: string) {
        console.log('[initPuppeteer] Starting browser');
        const browser = await launch({
            defaultViewport: {
                width: 1280,
                height: 720,
            },
        });
        console.log('[initPuppeteer] Starting page');
        const page = await browser.newPage();
        console.log('[initPuppeteer] Loading page');
        await page.goto(domPath);

        super._browser = browser;
        super._page = page;
    }

    private async initSpotify() {
        console.log('[initSpotify] Starting Spotify Player');
        super._page.evaluate((token: string) => {
            // @ts-ignore
            // eslint-disable-next-line no-undef
            window.player = new Spotify.Player(
                {
                    name: 'Spotify Audio Player',
                    getOAuthToken: (cb: ($arg: any) => void) => {
                        cb(token);
                    },
                },
                super.token,
            );
        });

        console.log('[initSpotify] Connecting Spotify Player');
        await super._page.evaluate(() => {
            window.player.connect();
        });
    }

    private async elevateEvents() {
        const self = this;

        console.log('[elevateEvents] Exposing elevate function');
        await super._page.exposeFunction('ELEVATE', (event: string, data: any) => {
            self.eventManager.emit(event, data);
        });

        console.log('[elevateEvents] Setting up events');
        await super._page.evaluate(() => {
            const events = [
                'ready',
                'not_ready',
                'player_state_changed',
                'initialization_error',
                'authentication_error',
                'account_error',
                'playback_error',
            ];
            if (window.ELEVATE) {
                events.forEach((event) => {
                    window.player.addListener(event, window.ELEVATE.bind(null, event));
                });
            }
        });
    }

    private async connectDevice() {
        console.log('[connectDevice] Getting deviceID');
        const deviceId = new Promise((resolve) => {
            this.eventManager.once('ready', ({ device_id }) => {
                resolve(device_id);
            });
            this.eventManager.once('error', (error) => {
                console.log('Error: ', error);
                throw new Error(error);
            });
        });
        console.log('[connectDevice] Connecting device');
        await super._page.evaluate(() => {
            window.player.connect();
        });
        console.time('[connectDevice] Waiting for deviceID');
        await deviceId;
        console.timeEnd('[connectDevice] Waiting for deviceID');
        this.deviceId = deviceId.toString();
        console.log('[connectDevice] DeviceID:', this.deviceId);
    }

    public override getStream(): Promise<Stream> {
        if (!super._page) {
            throw new Error('Page not initialized');
        }

        return getStream(super._page, {
            audio: true,
            video: false,
            frameSize: 20,
            mimeType: 'audio/webm',
        });
    }

    override async playTrack(track: Track) {
        if (track.provider !== 'spotify') {
            throw new Error('Track provider is not spotify');
        }
        if (!this.deviceId) {
            throw new Error('Device id not set');
        }
        // Todo: this will reset the player device
        const url = `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`;
        const data = {
            uris: [track.id],
        };
        await axios.put(url, data);
    }

    override async resumeTrack() {
        if (!super._page) {
            throw new Error('No page');
        }
        return super._page.evaluate(() => {
            return window.player.resume();
        });
    }

    override async pauseTrack() {
        if (!super._page) {
            throw new Error('No page');
        }
        return super._page.evaluate(() => {
            return window.player.pause();
        });
    }

    override async stopTrack() {
        if (!super._page) {
            throw new Error('No page');
        }
        return super._page.evaluate(() => {
            return window.player.disconnect();
        });
    }

    override async seekTrack(time: number) {
        if (!super._page) {
            throw new Error('No page');
        }
        return super._page.evaluate((pos: any) => {
            return window.player.seek(pos);
        }, time);
    }
}
