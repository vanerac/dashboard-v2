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
    const [numberWidgets, setNumberWidgets] = useState(0);
    const [servicesList, setServicesList] = useState<Service[]>([]);

    const addWidget = () => {
        console.log('add Widget');
        setNumberWidgets(numberWidgets + 1);
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

    console.log(servicesList);
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
