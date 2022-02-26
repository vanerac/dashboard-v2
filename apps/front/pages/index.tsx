import withAuth from './withAuth';
import TopBar from './../components/topBar';
// import Widgets from './../components/Widget';
import ShowcaseLayout from '../components/WidgetGrid';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { ApiClient } from '../../../packages/services/client';
import { Service } from '../../../packages/services/models/Service';
const cookies = new Cookies();

export function getClient() {
    return new ApiClient({
        TOKEN: cookies.get('API_TOKEN'),
    });
}

const Dasboard = () => {
    const [servicesList, setServicesList] = useState<Service[]>([]);

    // const test_data = [
    // { x: 0, y: 0, w: 0, h: 0, serviceType: 'spotify', widgetType: 2 },
    // { x: 0, y: 0, w: 7, h: 3, serviceType: 'google', widgetType: 3 },
    // ];

    const [numberWidgets, setNumberWidgets] = useState([]);

    const spotifyService = servicesList.find((service: { provider: string }) => service.provider === 'spotify');
    const googleService = servicesList.find((service: { provider: string }) => service.provider === 'google');
    const appleService = servicesList.find((service: { provider: string }) => service.provider === 'apple');
    const lastFMService = servicesList.find((service: { provider: string }) => service.provider === 'lastFM');

    const addWidget = (widgetServicetype) => {
        console.log('add Widget');
        console.log('ici => ', spotifyService);
        console.log('ici => ', googleService);
        const widgetService = widgetServicetype.split(':')[0];
        const typeService = widgetServicetype.split(':')[1];

        const newWidget = {
            serviceId: undefined,
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            type: typeService,
            data: 'string',
        };

        switch (widgetService) {
            case 'spotify':
                newWidget.serviceId = spotifyService.id;
                break;
            case 'apple':
                newWidget.serviceId = appleService.id;
                break;
            case 'lastFM':
                newWidget.serviceId = lastFMService.id;
                break;
            case 'youtube':
                newWidget.serviceId = googleService.id;
                break;
            default:
                console.log('ERROR CRETING NEW WIDGET');
        }

        setNumberWidgets((numberWidgets) => [...numberWidgets, newWidget]);
        getClient()
            // @ts-ignore
            .widget.createWidget(newWidget)
            .then((data) => {
                console.log('ici => ', data);
            });
    };

    useEffect(() => {
        Promise.all([getClient().services.getAllUserServices(), getClient().widget.getAllWidgets()]).then((data) => {
            setServicesList(data[0].services);
            setNumberWidgets(data[1]);
        });
    }, []);

    return React.createElement(
        'div',
        null,
        <>
            <TopBar addWidget={addWidget} connectedServices={servicesList} />
            <ShowcaseLayout widgetsAdded={numberWidgets} />
        </>,
    );
};

export default withAuth(Dasboard);
