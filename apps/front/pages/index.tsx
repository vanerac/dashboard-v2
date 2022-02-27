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

    const [numberWidgets, setNumberWidgets] = useState([]);

    // @ts-ignore
    const spotifyService = servicesList.find((service: { provider: string }) => service.provider === 'spotify');
    // @ts-ignore
    const googleService = servicesList.find((service: { provider: string }) => service.provider === 'google');
    // @ts-ignore
    const appleService = servicesList.find((service: { provider: string }) => service.provider === 'apple');
    // @ts-ignore
    const lastFMService = servicesList.find((service: { provider: string }) => service.provider === 'lastFM');

    const addWidget = (widgetServicetype: string) => {
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

    const deleteWidget = (widgetKey: string) => {
        console.log('widget deleted => ' + widgetKey);
        setNumberWidgets(numberWidgets.filter((item) => item.id !== widgetKey));
        // props.ok();
        getClient()
            .widget.deleteWidget(widgetKey)
            .then((data) => {
                console.log('response => ', data);
            });
    };

    return React.createElement(
        'div',
        null,
        <>
            <TopBar addWidget={addWidget} connectedServices={servicesList} />
            <ShowcaseLayout widgetsAdded={numberWidgets} deleteWidget={deleteWidget} />
        </>,
    );
};

export default withAuth(Dasboard);
