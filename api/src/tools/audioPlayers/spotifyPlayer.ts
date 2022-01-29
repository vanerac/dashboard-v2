import { Track } from './playerManager.tools';

import 'puppeteer-stream';
import { Browser, EventEmitter, Page } from 'puppeteer';
import path from 'path';
import { Stream, getStream, launch } from 'puppeteer-stream';
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

    private page: (Page & any) | undefined;
    private audioStream: Stream | undefined;
    private browser: (Browser & any) | undefined;

    private deviceId: string | undefined;
    private eventManager: EventEmitter = new EventEmitter();

    constructor(private readonly token: string) {
        super();
        this.token = token;

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
        const browser = await launch({
            defaultViewport: {
                width: 1280,
                height: 720,
            },
        });
        const page = await browser.newPage();
        await page.goto(domPath);

        this.browser = browser;
        this.page = page;
    }

    private async initSpotify() {
        this.page.evaluate((token: string) => {
            // @ts-ignore
            // eslint-disable-next-line no-undef
            window.player = new Spotify.Player(
                {
                    name: 'Spotify Audio Player',
                    getOAuthToken: (cb: ($arg: any) => void) => {
                        cb(token);
                    },
                },
                this.token,
            );
        });

        await this.page.waitForSelector('#player');
        await this.page.evaluate(() => {
            window.player.connect();
        });
    }

    private async elevateEvents() {
        const self = this;

        await this.page.exposeFunction('ELEVATE', (event: string, data: any) => {
            self.eventManager.emit(event, data);
        });

        await this.page.evaluate(() => {
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
        const deviceId = new Promise((resolve) => {
            this.eventManager.once('ready', ({ device_id }) => {
                resolve(device_id);
            });
        });
        await this.page.evaluate(() => {
            window.player.connect();
        });
        await deviceId;
        this.deviceId = deviceId.toString();
    }

    public getAudioStream(): Promise<unknown> {
        if (!this.page) {
            throw new Error('Page not initialized');
        }

        return getStream(this.page, {
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
        const url = `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`;
        const data = {
            uris: [track.id],
        };
        await axios.put(url, data);
    }

    override async resumeTrack() {
        if (!this.page) {
            throw new Error('No page');
        }
        return this.page.evaluate(() => {
            return window.player.resume();
        });
    }

    override async pauseTrack() {
        if (!this.page) {
            throw new Error('No page');
        }
        return this.page.evaluate(() => {
            return window.player.pause();
        });
    }

    override async stopTrack() {
        if (!this.page) {
            throw new Error('No page');
        }
        return this.page.evaluate(() => {
            return window.player.disconnect();
        });
    }

    override async seekTrack(time: number) {
        if (!this.page) {
            throw new Error('No page');
        }
        return this.page.evaluate((pos: any) => {
            return window.player.seek(pos);
        }, time);
    }
}
