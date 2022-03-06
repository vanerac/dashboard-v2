import { AudioPCMPlayer } from '@area/ui/Player/index';

export default class AudioPlayer extends AudioPCMPlayer {
    constructor(private device: any) {
        super();
        this.device = device;
    }

    play(pcm: Uint8Array): void {
        this.device.feed(pcm);
        this.device.continue();
    }
    stop(): void {
        this.device.destroy();
    }
}
