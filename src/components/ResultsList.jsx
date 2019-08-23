import React from 'react';
import PropTypes from 'prop-types';
import ResultsListRow from './ResultsListRow';

import './ResultsList.css';

export default class ResultsList extends React.Component {
    static propTypes = {
        results: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            flag: PropTypes.string.isRequired,
            measurements: PropTypes.arrayOf(PropTypes.number).isRequired,
            mean: PropTypes.number.isRequired,
            latest: PropTypes.number.isRequired,
        })).isRequired,
    };

    render() {
        let regions = Object.keys(this.props.results);
        regions.sort((a, b) => this.props.results[a].mean - this.props.results[b].mean);

        let regionData = regions.map(r => ({
            region: this.props.results[r].id,
            latestMeasurement: this.props.results[r].latest,
            measurements: this.props.results[r].measurements,
            mean: this.props.results[r].mean,
            flag: this.props.results[r].flag,
            name: this.props.results[r].name,
        }));
        
        let max = Math.max(...regionData.map(r => r.mean));

        let rows = regionData.map(r => (
            <ResultsListRow
                key={r.region}
                percentage={(r.mean * 100) / max}
                regionData={r} />));

        return (
            <div className="resultslist__container">
                <table className="resultslist__table">
                    <thead>
                        <tr>
                            <th className="resultslist__region">Region</th>
                            <th className="resultslist__latency">Average Latency</th>
                            <th className="resultslist__latencybar"></th>
                            <th className="resultslist__history">History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}