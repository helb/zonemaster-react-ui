import React from 'react';
import PropTypes from 'prop-types';
import backend from './backend.js';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testOptions: {
        ipv4: true,
        ipv6: true
      }
    };
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateTestProgress = this.updateTestProgress.bind(this);
  }

  componentWillMount() {
    this.getVersionInfo();
  }

  handleDomainChange(event) {
    event.preventDefault();
    const newState = Object.assign({}, this.state);
    newState.testOptions.domain = event.target.value;
    this.setState(newState);
  }

  handleOptionChange(event) {
    const newState = Object.assign({}, this.state);
    newState.testOptions[event.target.name] = event.target.checked;
    this.setState(newState);
    event.stopPropagation();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const testId = this.startDomainTest();
  }

  async getVersionInfo() {
    const version = await backend.versionInfo();
    this.setState({ version });
  }

  async startDomainTest() {
    this.setState({ testRunning: true, testProgress: 0 });
    const testId = await backend.startDomainTest(this.state.testOptions);
    this.setState({ testId: testId.id });
    this.updateProgressTimer = setInterval(this.updateTestProgress, 750);
  }

  async updateTestProgress() {
    const testProgress = await backend.testProgress(this.state.testId);
    if (testProgress.progress >= 100) {
      this.setState({ testRunning: false });
      clearInterval(this.updateProgressTimer);
    }
    this.setState({ testProgress: testProgress.progress });
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label>
              Domain name:
              <input
                type="text"
                onChange={this.handleDomainChange}
                disabled={this.state.testRunning}
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="ipv4"
                onChange={this.handleOptionChange}
                disabled={this.state.testRunning || !this.state.testOptions.ipv6}
                checked={this.state.testOptions.ipv4}
              />
              ipv4
            </label>
            <label>
              <input
                type="checkbox"
                name="ipv6"
                onChange={this.handleOptionChange}
                disabled={this.state.testRunning || !this.state.testOptions.ipv4}
                checked={this.state.testOptions.ipv6}
              />
              ipv6
            </label>
            <button type="submit" disabled={this.state.testRunning}>
              Start
            </button>
          </form>
          {this.state.testRunning ? <p>RUNNING</p> : <p>-</p>}
        </div>
        <ul>
          <li>
            backend: {this.state.version ? this.state.version.zonemaster_backend : 'loading'}
          </li>
          <li>
            engine: {this.state.version ? this.state.version.zonemaster_engine : 'loading'}
          </li>
          <li>
            progress: {!isNaN(this.state.testProgress) ? `${this.state.testProgress} %` : '-- %'}
          </li>
          <li>
            result:{' '}
            {this.state.testId && this.state.testProgress === 100
              ? <a href={`/test/${this.state.testId}`}>
                {this.state.testId}
              </a>
              : '--'}
          </li>
        </ul>
      </div>
    );
  }
}
