import withAuth from './withAuth';
import TopBar from './../components/topBar';
// import Widgets from './../components/Widget';
import ShowcaseLayout from '../components/WidgetGrid';
import React, { useState } from 'react';

const Dasboard = () => {
    const [numberWidgets, setNumberWidgets] = useState(0);
    const [servicesList, setServicesList] = useState<Service[]>([]);

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

    // console.log('ici => ', Client.request.config.TOKEN);
    useEffect(() => {
        getClient()
            .services.getAllUserServices()
            .then((data) => {
                setServicesList(data.services);
                console.log(data);
            });
    }, []);

    // console.log('data => ', test_data.w);

    console.log(servicesList);
    return React.createElement(
        'div',
        null,
        <>
            <TopBar addWidget={addWidget} />
            <ShowcaseLayout widgetsAdded={numberWidgets} />
        </>,
    );
};

export default withAuth(Dasboard);
