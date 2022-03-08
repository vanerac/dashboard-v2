import React, { Key, useState } from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import { CardTest } from '../../../packages/ui/CardTest';
import { getClient } from '../utils/ApiClient';
import { LibWidget } from '../../../packages/ui/Widgets/LibWidget';
import { SearchWidget } from '@area/ui/Widgets/SearchWidget';
import { ArtistWidget } from '@area/ui/Widgets/ArtistWidget';
import { AlbumWidget } from '@area/ui/Widgets/AlbumWidget';

let ResponsiveReactGridLayout = WidthProvider(RGL);

const SearchWidgetWrapper = ({ deleteWidget, widgetKey, widgetService, clientAPi }) => {
    const [searchStr, setSearchStr] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(e.target.value);
    };

    return (
        <>
            <input
                type={'text'}
                style={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '14px 20px',
                    margin: '8px 0',
                    border: 'none',
                    borderRadius: '4px',
                }}
                onChange={handleChange}
                placeholder="Search…"
                value={searchStr}
            />
            <SearchWidget
                key={widgetKey}
                widgetKey={widgetKey}
                widgetService={widgetService}
                clientAPi={clientAPi}
                searchString={searchStr}
                deleteWidget={deleteWidget}
            />
        </>
    );
};

const ShowcaseLayout = (props: { widgetsAdded: any; deleteWidget: any }) => {
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
                    {
                        {
                            search: (
                                <SearchWidgetWrapper
                                    deleteWidget={props.deleteWidget}
                                    widgetKey={l.widgetKey}
                                    widgetService={l.widgetService}
                                    clientAPi={getClient}
                                />
                            ),
                            album: (
                                <AlbumWidget
                                    deleteWidget={props.deleteWidget}
                                    widgetKey={l.widgetKey}
                                    clientAPi={getClient}
                                />
                            ),
                            stat: 'stat',
                            playlist: (
                                <LibWidget
                                    deleteWidget={props.deleteWidget}
                                    widgetKey={l.widgetKey}
                                    widgetService={l.widgetService}
                                    clientAPi={getClient}
                                    isMobileApp={false}
                                />
                            ),
                            artist: (
                                <ArtistWidget
                                    deleteWidget={props.deleteWidget}
                                    widgetKey={l.widgetKey}
                                    widgetService={l.widgetService}
                                    clientAPi={getClient}
                                    handleArtistListClick={console.log}
                                />
                            ),
                        }[l.widgetType]
                    }
                </div>
            );

            // )
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
                maxW: 9,
                minW: 4,
                minH: 2,
                maxH: 7,
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
