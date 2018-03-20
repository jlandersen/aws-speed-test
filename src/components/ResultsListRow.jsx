import React from 'react';
import PropTypes from 'prop-types';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import './ResultsListRow.css';

class ResultsListRow extends React.Component {
    static propTypes = {
        percentage: PropTypes.number,
        regionData: PropTypes.object,
    };

    render() {
        const latency = this.props.regionData.mean;
        const progressStyle = {
            width: this.props.percentage + "%",
        };

        const values = this.props.regionData.measurements.map(v => Math.trunc(v));

        return (
            <tr>
                <td>
                    <div>
                        <div className="resultslist-row__flag">
                            <img src={this.props.regionData.flag} width="44" height="33" />
                        </div>
                        <div className="resultslist-row__name">
                            <span>{this.props.regionData.name}</span><br/>
                            <span className="resultslist-row__region">{this.props.regionData.region}</span>
                        </div>
                    </div>


                </td>
                <td>
                    {latency.toFixed(0)}ms
                </td>
                <td>
                    <div className="resultslist-row__progress" style={progressStyle}>
                    </div>
                </td>
                <td>
                    <Sparklines data={values} limit={100} height={24} margin={5}>
                        <SparklinesLine />
                    </Sparklines>
                </td>
            </tr>
        );
    }
}

export default ResultsListRow;