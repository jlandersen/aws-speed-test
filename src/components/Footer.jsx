import React from 'react';

import "./Footer.css";

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <p>
          The values presented on this site should only be used as an indication of the relative difference in latency for for accessing AWS endpoints between different regions.
        </p>
        <p>
          Note for Firefox users, if you have privacy.resistFingerprinting enabled, latency resolution is lowered.
        </p>
        <p>
          Created by <a href="https://twitter.com/nocture">@nocture</a> (<a href="http://www.nocture.dk">nocture.dk</a>). <a href="https://github.com/jlandersen/aws-speed-test">Fork</a> on GitHub.
        </p>
        <p>
          Based on <a href="https://azurespeedtest.azurewebsites.net">Azure Speed Test 2.0</a>.
        </p>
      </footer>);
  }
}
