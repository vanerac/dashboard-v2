import withAuth from './withAuth';
import TopBar from './../components/topBar';
// import Widgets from './../components/Widget';
import ShowcaseLayout from '../components/WidgetGrid';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { ApiClient } from '../../../packages/services/client';
import { Service } from '../../../packages/services/models/Service';
import { AudioPCMPlayer, PlayerComponent } from '@area/ui/Player/index';
import AudioPlayer from '../utils/AudioPlayer';
import PCMPlayer from 'pcm-player';

const cookies = new Cookies();

export function getClient() {
    return new ApiClient({
        TOKEN: cookies.get('API_TOKEN'),
    });
}

const Dasboard = () => {
    const [servicesList, setServicesList] = useState<Service[]>([]);
    const [playbackDevice] = useState<AudioPCMPlayer>(
        new AudioPlayer(
            new PCMPlayer({
                inputCodec: 'Int16',
                channels: 2,
                sampleRate: 44000,
                flushTime: 200,
            }),
        ),
    );

    const test_data = [
        { x: 0, y: 0, w: 2, h: 2, serviceType: 'spotify', widgetType: 2 },
        { x: 0, y: 0, w: 7, h: 3, serviceType: 'google', widgetType: 3 },
    ];

    const [numberWidgets, setNumberWidgets] = useState(test_data);

    const addWidget = () => {
        // TODO : api call => balancer un widget en db
        console.log('add Widget');
        setNumberWidgets((numberWidgets) => [
            ...numberWidgets,
            { x: 0, y: 0, w: 1, h: 1, serviceType: 'spotify', widgetType: 2 },
        ]);
        console.log(numberWidgets);
    };

    useEffect(() => {
        getClient()
            .services.getAllUserServices()
            .then((data) => {
                setServicesList(data.services);
                console.log(data);
            });
    }, []);

    console.log(servicesList);
    return React.createElement(
        'div',
        null,
        <>
            <TopBar addWidget={addWidget} connectedServices={servicesList} />
            <ShowcaseLayout widgetsAdded={numberWidgets} />
            <PlayerComponent device={playbackDevice} />
        </>,
    );
};

export default withAuth(Dasboard);
