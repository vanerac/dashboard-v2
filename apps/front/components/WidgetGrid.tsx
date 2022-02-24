import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Key } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { CardTest } from '../../../packages/ui/CardTest';

let ResponsiveReactGridLayout = WidthProvider(RGL);

const ShowcaseLayout = (props: { widgetsAdded: any }) => {
    const generateDOM = () => {
        return _.map(generateLayout(), function (l: any, i: Key) {
            // return <div key={i} style={{ backgroundColor: 'lightblue', borderRadius: '4px' }}></div>;
            return (
                <div key={i}>
                    <CardTest />
                </div>
            );
        });
    };
    console.log(props.widgetsAdded);

    function generateLayout() {
        return _.map(_.range(0, props.widgetsAdded.length), function (i) {
            console.log(i)
            return {
                x: props.widgetsAdded[i].x,
                y: props.widgetsAdded[i].y,
                w: props.widgetsAdded[i].w,
                h: props.widgetsAdded[i].h,
                i: i.toString(),
            };
        });
    }

    const onLayoutChange = (layout: any) => {
        // TODO : route PUT pour modifier dans la db
        console.log(layout)
    }

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
