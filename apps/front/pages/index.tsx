import withAuth from './withAuth';
import TopBar from './../components/topBar';
// import Widgets from './../components/Widget';
import ShowcaseLayout from '../components/WidgetGrid';
import React, { useState } from 'react';

const Dasboard = () => {
    const [numberWidgets, setNumberWidgets] = useState(0);

    const addWidget = () => {
        console.log('add Widget');
        setNumberWidgets(numberWidgets + 1);
        console.log(numberWidgets);
    };

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
