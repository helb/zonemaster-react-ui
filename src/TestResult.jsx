import React from 'react';
import PropTypes from 'prop-types';
import backend from './backend.js';

export default class TestResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.getTestResult(this.props.match.params.id);
  }

  async getTestResult(id) {
    const testResult = await backend.testResult(id);
    this.setState({ testResult });
  }

  render() {
    if (!backend.validateTestID(this.props.match.params.id)) {
      return <p>Invalid test ID.</p>;
    }
    return (
      <ul>
        <li>
            ID: {this.props.match.params.id}
        </li>
        <li>
            domain: {this.state.testResult ? this.state.testResult.params.domain : 'loading'}
        </li>
        <li>
            date: {this.state.testResult
              ? new Date(this.state.testResult.creation_time).toLocaleString()
              : 'loading'}
        </li>
      </ul>
    );
  }
}
