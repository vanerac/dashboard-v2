import { AudioPlayer, Track } from './playerManager.tools';
import { Token } from '../types';
import { JSDOM } from 'jsdom';

export default class SpotifyAudioPlayer extends AudioPlayer {
    private vdom: JSDOM | undefined;

    constructor() {
        super();
        // Create an audio pipeline
        // Create virual dom with audio element
        this.vdom = undefined;
        const bindDOM = (dom: JSDOM) => (this.vdom = dom);
        JSDOM.fromFile('./api/src/tools/audioPlayers/spotifyPlayer.html').then(bindDOM.bind(this));

        // Todo: get audio pipeline
    }

    redirectAudio() {
        if (!this.vdom) return;
    }

    login(token: Token) {
        // Login to Spotify Audio SDK Using token
        if (this.vdom) {
            this.vdom.window.custom_player.login(token);
        }
    }

    override playTrack(track: Track) {
        // play track through dom
        if (this.vdom) {
            this.vdom.window.custom_player.playTrack(track);
        }
    }

    override pauseTrack() {
        // pause track through dom
        if (this.vdom) {
            this.vdom.window.custom_player.pauseTrack();
        }
    }

    override stopTrack() {
        // stop track  through dom
        if (this.vdom) {
            this.vdom.window.custom_player.stopTrack();
        }
    }

    override seekTrack(time: number) {
        // seek track  through dom
        if (this.vdom) {
            this.vdom.window.custom_player.seekTrack(time);
        }
    }
}
