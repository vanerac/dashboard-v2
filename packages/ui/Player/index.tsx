import React, {useEffect, useState} from 'react';
import {getClient} from "@area/front/pages";
import {Button, Text, View} from 'react-native';


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
        console.log('useEffect');
        getClient().devices.registerDevice({
            name: 'AREA Player',
        }).then(({data_url, state_url}) => {
            console.log('data_url', data_url, state_url);
            new WebSocket(data_url).addEventListener ('message', async message =>{
                console.log(await message.data.arrayBuffer());
                device.play(await message.data.arrayBuffer());
            });
            new WebSocket(state_url).onmessage = (event ) => {
                event.data.text().then((text: string) => {
                    const state = JSON.parse(text);
                    console.log('state', state);
                    setPlaybackState(state);
                })

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
            <Button onPress={console.log} title={'BITe'}>BITE</Button >
           <Text>{playbackState.title}</Text>
        </View>
    );

}
