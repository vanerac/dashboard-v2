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

    const addWidget = () => {
        // TODO : api call => balancer un widget en db
        console.log('add Widget');
        const newWidget = {
            serviceId: '911fbe56-b7f4-4a3e-9eba-cec2d907909b',
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            type: 'stat',
            data: 'string',
        };
        setNumberWidgets((numberWidgets) => [...numberWidgets, newWidget]);
        getClient()
            // @ts-ignore
            .widget.createWidget(newWidget)
            .then((data) => {
                console.log('ici => ', data);
            });
        console.log(numberWidgets);
    };

    // console.log('ici => ', Client.request.config.TOKEN);
    // useEffect(() => {
    //     getClient()
    //         .services.getAllUserServices()
    //         .then((data) => {
    //             setServicesList(data.services);
    //             console.log(data);
    //         });

    //     getClient()
    //         .widget.createWidget({
    //             serviceId: '911fbe56-b7f4-4a3e-9eba-cec2d907909b',
    //             x: 0,
    //             y: 0,
    //             width: 2,
    //             height: 2,
    //             type: 'stat',
    //             data: 'string',
    //         })
    //         .then((data) => {
    //             console.log('ici => ', data);
    //         });

    //     getClient()
    //         .widget.getAllWidgets()
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }, []);

    useEffect(() => {
        Promise.all([getClient().services.getAllUserServices(), getClient().widget.getAllWidgets()]).then((data) => {
            // console.log('services => ', data[0]);
            setServicesList(data[0].services);
            // console.log('widget => ', data[1]);
            // var newArray = numberWidgets.concat(data[1]);
            // console.log('data de [1][0] => ', data[1][0]);
            // console.log('newArray => ', newArray);
            // setNumberWidgets((numberWidgets) => [...numberWidgets, newArray]);
            setNumberWidgets(data[1]);
            // console.log('le use state est al => ', numberWidgets);
        });
    }, []);

    // console.log('data => ', test_data.w);

    // console.log(servicesList);
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
