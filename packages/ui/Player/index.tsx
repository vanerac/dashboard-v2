import React, {useEffect, useState} from 'react';
import {getClient} from "@area/front/pages";

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

const playerState = () => {
    const [playbackState, setPlaybackState] = useState<any>([]);
    useEffect(() => {
    getClient().player.listenState().then(({url}: {url: string}) => {
        setPlaybackState(url); // TODO fix type
        Websocket(url).on('message', (message: any) => {
            setPlaybackState(message); // TODO fix type
        });
    });
    }, []);

  return (
    <div>
      <h1>playerState</h1>
    </div>
  );
};


const PlayerComponent = ({device}: {device: any}) => {
    useEffect(() => {
        // register component
        getClient().devices.registerDevice({
            name: 'AREA Player',
        }).then(({url}: {url: string}) => {
            const socket = Websocket(url);
            socket.pipe(device)
        })
    }, []);
}
