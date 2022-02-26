import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Key } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { CardTest } from '../../../packages/ui/CardTest';
import { Widgets } from '@mui/icons-material';

let ResponsiveReactGridLayout = WidthProvider(RGL);

const ShowcaseLayout = (props: { widgetsAdded: any }) => {
    console.log('widgets added -> ', props.widgetsAdded);

    const generateDOM = () => {
        return _.map(generateLayout(), function (l: any, i: Key) {
            console.log(l);
            return (
                <div key={i}>
                    {l.widgetType} + {l.widgetService}
                    <CardTest />
                </div>
            );
        });
    };

    function generateLayout() {
        return _.map(_.range(0, props.widgetsAdded.length), function (i) {
            return {
                x: props.widgetsAdded[i].x,
                y: props.widgetsAdded[i].y,
                w: props.widgetsAdded[i].width,
                h: props.widgetsAdded[i].height,
                widgetType: props.widgetsAdded[i].type,
                widgetService: props.widgetsAdded[i].serviceid,
                i: i.toString(),
            };
        });
    }

    const onLayoutChange = (layout: any) => {
        // TODO : route PUT pour modifier dans la db
        // console.log(layout);
    };

    return (
        <ResponsiveReactGridLayout
            layout={generateLayout()}
            onLayoutChange={onLayoutChange}
            // isResizable={false}
            compactType={'vertical'}
            preventCollision={!'vertical'}>
            {generateDOM()}
        </ResponsiveReactGridLayout>
    );
};

export default ShowcaseLayout;
