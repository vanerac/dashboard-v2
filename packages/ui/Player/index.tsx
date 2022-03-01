import React, {useEffect, useState} from 'react';
import {getClient} from "@area/front/pages";
import {Text, View} from 'react-native';

export abstract class AudioPCMPlayer {
    abstract play(pcm: Uint8Array): void;
    abstract stop(): void;
}


const deviceList = () => {
    const [devices, setDevices] = useState<any>([]);
    useEffect(() => {
    getClient().devices.getAllDevices().then(devices => {
        setDevices(devices); // TODO fix type
    });
    }, []);

  return (
    <div>
      <h1>deviceList</h1>
    </div>
  );
};


export const PlayerComponent = ({device}: {device: AudioPCMPlayer}) => {

    const [playbackState, setPlaybackState] = useState<any>({});
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        // register component
        getClient().devices.registerDevice({
            name: 'AREA Player',
        }).then(({data_url, state_url}) => {


            new WebSocket(data_url).onmessage = (message) => {
                device.play(message.data);
            };
            new WebSocket(state_url).onmessage = (event ) => {
                setPlaybackState(JSON.parse(event.data));
            };
        })
    }, []);


    const togglePlayback = async () => {
        if (isPlaying) {
            getClient().playback.pause()
            setIsPlaying(false);
        } else {
            getClient().playback.resume()
            setIsPlaying(true);
        }
    }


    return (
        <View>
           <Text>{playbackState.title}</Text>
        </View>
    );

}
