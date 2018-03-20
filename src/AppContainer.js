import React from 'react';
import App from './App.jsx';
import SpeedTest from './lib/SpeedTest';
import config from './lib/config';

export default class AppContainer extends React.Component {
    constructor() {
        super();
        let regions = this.getRegionsFromConfig();

        this.state = {
            results: regions,
        };
    }

    getRegionsFromConfig() {
        return config.locations.map(l => ({
            ...l,
            measurements: [],
            measurementCount: 0,
            latest: 0,
            mean: 0,
        }));
    }

    componentDidMount() {
        let Speedtest = new SpeedTest();
        Speedtest.start(this.state.results, this.handleReceiveMeasurement.bind(this));
    }

    handleReceiveMeasurement(data) {
        this.setState(prev => {
            let results = prev.results.map(item => {
                if (item.id !== data.regionId) {
                    return item;
                }

                let newMeasurementCount = item.measurementCount + 1;
                return {
                    ...item,
                    measurements: [...item.measurements.slice(-100), data.result],
                    measurementCount: newMeasurementCount,
                    latest: data.result,
                    mean: item.mean + ((data.result - item.mean) / newMeasurementCount),
                };
            });

            return {
                ...prev,
                results,
            };
        });
    }

    render() {
        return <App regions={ this.state.results.filter(i => i.measurementCount > 0) } />;
    }
}