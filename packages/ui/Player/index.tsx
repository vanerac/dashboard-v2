import React, {useEffect, useState} from 'react';
import {getClient} from "@area/front/pages";
import {View} from 'react-native';

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

const PlayerComponent = ({device}: {device: any}) => {

    const [playbackState, setPlaybackState] = useState<any>({});
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        // register component
        getClient().devices.registerDevice({
            name: 'AREA Player',
        }).then(({data_url, state_url}) => {


            new WebSocket(data_url).onmessage = (message: any) => {
                device.send(message);
            };
            new WebSocket(state_url).onmessage = (event) => {
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
            <h1>Player</h1>
            <button onClick={togglePlayback}>{isPlaying ? 'Pause' : 'Play'}</button>
            <div>
                <h2>Playback State</h2>
                <pre>{JSON.stringify(playbackState, null, 2)}</pre>
            </div>
        </View>
    );

}
