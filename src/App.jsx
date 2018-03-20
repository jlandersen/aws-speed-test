import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import ResultsList from './components/ResultsList';
import Footer from './components/Footer';

import "./App.css";

export default class App extends React.PureComponent {
  static propTypes = {
    regions: ResultsList.propTypes.results,
  };

  render() {
    return (
      <div>
        <Header />
        <ResultsList results={ this.props.regions } />
        <Footer />
      </div>);
  }
}