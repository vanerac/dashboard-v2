import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Key } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import { CardTest } from '../../../packages/ui/CardTest';
import { getClient } from '../utils/ApiClient';
import { LibWidget } from '../../../packages/ui/Widgets/LibWidget';

let ResponsiveReactGridLayout = WidthProvider(RGL);

const ShowcaseLayout = (props: { widgetsAdded: any; deleteWidget: any }) => {
    const handlePlaylistClick = () => {
        console.log('wallah');
    };

    const generateDOM = () => {
        return _.map(generateLayout(), function (l: any, i: Key) {
            return (
                <div key={i}>
                    {/* {l.widgetType} + {l.widgetService} + {l.widgetKey} */}
                    {/*<CardTest*/}
                    {/*    deleteWidget={props.deleteWidget}*/}
                    {/*    widgetKey={l.widgetKey}*/}
                    {/*    widgetService={l.widgetService}*/}
                    {/*    clientAPi={getClient}*/}
                    {/*/>*/}
                    <LibWidget
                        deleteWidget={props.deleteWidget}
                        widgetKey={l.widgetKey}
                        widgetService={l.widgetService}
                        clientAPi={getClient}
                        handlePlaylistCardClick={handlePlaylistClick}
                    />
                </div>
            );
        });
    };

    function generateLayout() {
        return _.map(_.range(0, props.widgetsAdded.length), function (i: string | number) {
            return {
                x: props.widgetsAdded[i].x,
                y: props.widgetsAdded[i].y,
                w: props.widgetsAdded[i].width,
                h: props.widgetsAdded[i].height,
                widgetType: props.widgetsAdded[i].type,
                widgetService: props.widgetsAdded[i].serviceId,
                widgetKey: props.widgetsAdded[i].id,
                i: i.toString(),
                maxW: 5,
                minW: 2,
                minH: 2,
                maxH: 5,
            };
        });
    }

    const onLayoutChange = (layout: any) => {
        layout.forEach(function (item: any, index: any) {
            props.widgetsAdded[index].x = item.x;
            props.widgetsAdded[index].y = item.y;
            props.widgetsAdded[index].height = item.h;
            props.widgetsAdded[index].width = item.w;
        });
        getClient().widget.updateBulk(props.widgetsAdded).then();
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
