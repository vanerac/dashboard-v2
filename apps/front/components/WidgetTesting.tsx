import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ShowcaseLayout_bis = () => {
    const generateDOM = () => {
        //@ts-ignore
        return _.map(generateLayout(), function (l, i) {
            return (
                // <div key={i} className={l.static ? 'static' : ''}>
                <div key={i} style={{ backgroundColor: 'lightblue', borderRadius: '4px' }}>
                    {/* {l.static ? (
                        <span className="text" title="This item is static and cannot be removed or resized.">
                            Static - {i}
                        </span>
                    ) : ( */}
                    {/* <span className="text">{i}</span> */}
                    <>oui chef</>
                    {/* <Card /> */}
                    {/* )} */}
                </div>
            );
        });
    }

    function generateLayout() {
        return _.map(_.range(0, 27), function (i) {
            var y = Math.ceil(Math.random() * 4) + 1;
            return {
                // x: (_.random(0, 5) * 2) % 12,
                x: 0,
                // y: Math.floor(i / 6) * y,
                y: 0,
                w: y,
                h: y,
                i: i.toString(),
                // static: Math.random() < 0.05,
            };
        });
    }

    return (
        <div>
            {/* <div>
                Current Breakpoint: {this.state.currentBreakpoint} ({this.props.cols[this.state.currentBreakpoint]}{' '}
                columns)
            </div> */}
            {/* <div>Compaction type: {_.capitalize(this.state.compactType) || 'No Compaction'}</div> */}
            {/* <button onClick={this.onNewLayout}>Generate New Layout</button> */}
            {/* <button onClick={this.onCompactTypeChange}>Change Compaction Type</button> */}
            <ResponsiveReactGridLayout
                //@ts-ignore
                // {...this.props}
                //@ts-ignore
                layouts={{ lg: generateLayout() }}
                // onBreakpointChange={this.onBreakpointChange}
                // onLayoutChange={this.onLayoutChange}
                // WidthProvider option
                // measureBeforeMount={false}
                // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                // and set `measureBeforeMount={true}`.
                //@ts-ignore
                // useCSSTransforms={this.state.mounted}
                //@ts-ignore
                compactType={'vertical'}
                //@ts-ignore
                preventCollision={!'vertical'}>
                {generateDOM()}
            </ResponsiveReactGridLayout>
        </div>
    );
}

export default ShowcaseLayout_bis;