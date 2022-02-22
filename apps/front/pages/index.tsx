import withAuth from './withAuth';
import TopBar from './../components/topBar';
// import Widgets from './../components/Widget';
import ShowcaseLayout from '../components/WidgetGrid';
import React, { useState } from 'react';
import { Client } from '../../../packages/global';
import Cookies from 'universal-cookie';
import { ApiClient } from '../../../packages/services/client';
const cookies = new Cookies();

export function getClient() {
    return new ApiClient({
        TOKEN: cookies.get('API_TOKEN'),
    });
}

const Dasboard = () => {
    const [numberWidgets, setNumberWidgets] = useState(0);

    const addWidget = () => {
        console.log('add Widget');
        setNumberWidgets(numberWidgets + 1);
        console.log(numberWidgets);
    };

    console.log('ici => ', Client.request.config.TOKEN);
    getClient().services.getAllUserServices().then((data) => {
        console.log(data);
    });

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
