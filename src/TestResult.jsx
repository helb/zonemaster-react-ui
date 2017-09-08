import React from 'react';
import PropTypes from 'prop-types';
import backend from './backend.js';
import config from '../config.json';

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
      <div>
        <ul>
          <li>
            ID: {this.props.match.params.id}
          </li>
          <li>
            domain: {this.state.testResult ? this.state.testResult.params.domain : 'loading'}
          </li>
          <li>
            date:{' '}
            {this.state.testResult
              ? new Date(this.state.testResult.creation_time).toLocaleString()
              : 'loading'}
          </li>
        </ul>

        <table style={{ fontFamily: 'monospace', borderCollapse: 'collapse' }}>
          <tbody>
            {this.state.testResult
              ? this.state.testResult.results.map((item, index, items) =>
                (<tr key={index} style={{ verticalAlign: 'top'}}>
                  <td
                    style={{
                      fontWeight: 'bold',
                      color: config.colors.modules[item.module] || 'white',
                      borderLeft: `0.5em solid ${config.colors.modules[item.module] || 'black'}`,
                      padding: '0.5em'
                    }}
                  >
                    {!items[index - 1] ? items[0]['module'] : ''}
                    {items[index - 1] && items[index - 1]['module'] != item.module ? item.module: ''}
                  </td>
                  <td
                    style={{
                      fontWeight: 'bold',
                      color: config.colors.levels[item.level],
                      padding: '0.5em'
                    }}
                  >
                    {item.level}
                  </td>
                  <td style={{ padding: '0.5em' }}>
                    {item.message}
                  </td>
                </tr>)
                )
              : ''}
          </tbody>
        </table>
      </div>
    );
  }
}
