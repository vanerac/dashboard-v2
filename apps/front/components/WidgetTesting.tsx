import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
// import Card from './Card'

export default class ShowcaseLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBreakpoint: 'lg',
            compactType: 'vertical',
            mounted: false,
            layouts: { lg: generateLayout() },
        };

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        // this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        // this.onNewLayout = this.onNewLayout.bind(this);
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    generateDOM() {
        //@ts-ignore
        return _.map(this.state.layouts.lg, function (l, i) {
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

    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint,
        });
    }

    // onCompactTypeChange() {
    //     //@ts-ignore
    //     const { compactType: oldCompactType } = this.state;
    //     const compactType =
    //         oldCompactType === 'horizontal' ? 'vertical' : oldCompactType === 'vertical' ? null : 'horizontal';
    //     this.setState({ compactType });
    // }

    onLayoutChange(layout, layouts) {
        //@ts-ignore
        this.props.onLayoutChange(layout, layouts);
    }

    // onNewLayout() {
    //     this.setState({
    //         layouts: { lg: generateLayout() },
    //     });
    // }

    render() {
        //@ts-ignore
        console.log('Number of widgets => ', this.props.numberWidgets);

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
                    {...this.props}
                    //@ts-ignore
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    // measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    //@ts-ignore
                    useCSSTransforms={this.state.mounted}
                    //@ts-ignore
                    compactType={this.state.compactType}
                    //@ts-ignore
                    preventCollision={!this.state.compactType}>
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

//@ts-ignore
// ShowcaseLayout.propTypes = {
//     onLayoutChange: PropTypes.func.isRequired,
// };

//@ts-ignore
ShowcaseLayout.defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    // initialLayout: generateLayout(),
};

function generateLayout() {
    return _.map(_.range(0, 2), function (i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            // x: (_.random(0, 5) * 2) % 12,
            x: 0,
            // y: Math.floor(i / 6) * y,
            y: 0,
            w: 2,
            h: y,
            i: i.toString(),
            // static: Math.random() < 0.05,
        };
    });
}
