import { AudioPCMPlayer } from '@area/ui/Player/index';

export default class AudioPlayer extends AudioPCMPlayer {
    constructor(private device: any) {
        super();
        this.device = device;
    }

    play(pcm: Uint8Array): void {
        this.device.feed(new Uint8Array(pcm));
    }
    stop(): void {
        this.device.destroy();
    }
}
