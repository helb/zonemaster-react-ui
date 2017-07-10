import Zonemaster from 'zonemaster-js';
import React from 'react';
import PropTypes from 'prop-types';
import TestResult from './TestResult.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.backend = new Zonemaster(this.props.backendUrl);
  }

  componentWillMount() {
    this.getVersionInfo();
    // this.getTestResult('2499e68a5e11234a');
  }

  async getVersionInfo() {
    const version = await this.backend.versionInfo();
    this.setState({ version });
  }

  async getTestResult(id) {
    const testResult = await this.backend.testResult(id);
    this.setState({ testResult });
  }

  render() {
    return (
      <div>
        <TestResult data={this.state.testResult ? this.state.testResult : null} />
        <ul>
          <li>
            backend: {this.state.version ? this.state.version.zonemaster_backend : 'loading'}
          </li>
          <li>
            engine: {this.state.version ? this.state.version.zonemaster_engine : 'loading'}
          </li>
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  backendUrl: PropTypes.string.isRequired
};
