import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Key } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { CardTest } from '../../../packages/ui/CardTest';

let ResponsiveReactGridLayout = WidthProvider(RGL);

const ShowcaseLayout = (props: { widgetsAdded: any }) => {
    console.log(generateLayout());
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

    function generateLayout() {
        return _.map(_.range(0, props.widgetsAdded), function (i: { toString: () => any }) {
            return {
                x: 0,
                y: 0,
                w: 2,
                h: 1.5,
                i: i.toString(),
            };
        });
    }

    return (
        <ResponsiveReactGridLayout
            layout={generateLayout()}
            // isResizable={false}
            compactType={'vertical'}
            preventCollision={!'vertical'}>
            {generateDOM()}
        </ResponsiveReactGridLayout>
    );
};

export default ShowcaseLayout;
