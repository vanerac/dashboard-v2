import { AudioPCMPlayer } from '@area/ui/Player';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// react native audio player wrapper
// takes in ws data and plays it
// uses expo audio player

// To play music from buffer you need to create a buffer from the ws data
// buffer is written to a file and then played

export class AudioPlayer extends AudioPCMPlayer {
    private randomFileName: string;
    constructor() {
        super();
        // Init player
        //
        this.randomFileName = `${Math.random() * 100000}.wav`;
        new Audio.Sound();
    }

    play(pcm: Uint8Array): void {
        this.playFromBuffer(pcm);
    }
    stop(): void {
        this.stopPlaying();
    }

    private playFromBuffer(buffer: Uint8Array): void {
        // write buffer to file
        // play file
        FileSystem.writeAsStringAsync(
            FileSystem.documentDirectory + this.randomFileName,
            new TextDecoder().decode(buffer),
            {
                encoding: FileSystem.EncodingType.Base64,
            },
        );
        // play file
        Audio.Sound.createAsync(
            { uri: FileSystem.documentDirectory + this.randomFileName },
            {
                shouldPlay: true,
                isLooping: false,
            },
        );
    }

    private stopPlaying(): void {
        // stop file
        Audio.Sound.createAsync(
            { uri: FileSystem.documentDirectory + this.randomFileName },
            {
                shouldPlay: false,
                isLooping: false,
            },
        );
    }
}
