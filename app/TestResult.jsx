import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import backend from './backend';
import config from '../config.json';

const Container = styled.div`
  ul {
    list-style-position: inside;
    margin-bottom: 2em;
  }
`;

const ResultTable = styled.table`
  font-family: monospace;
  border-collapse: collapse;
  max-width: 100vw;
`;

const ResultLine = styled.tr`
  vertical-align: top;
`;

const ModuleCell = styled.td`
  border-left: 0.5em solid ${props => props.border};
  font-weight: bold;
  padding: 0.5em;
  color: ${props => props.color};
`;

const LevelCell = styled.td`
  font-weight: bold;
  padding: 0.5em;
  color: ${props => props.color};
`;

const MessageCell = styled.td`
  padding: 0.5em;
  word-break: break-all;
`;

class TestResult extends React.Component {
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
      <Container>
        <ul>
          <li>domain: {this.state.testResult ? this.state.testResult.params.domain : 'loading'}</li>
          <li>
            date:{' '}
            {this.state.testResult
              ? new Date(this.state.testResult.creation_time).toLocaleString()
              : 'loading'}
          </li>
        </ul>

        <ResultTable>
          <tbody>
            {this.state.testResult
              ? this.state.testResult.results.map((item, index, items) => (
                <ResultLine key={btoa(index + item.message)}>
                  <ModuleCell
                    color={config.colors.modules[item.module] || 'white'}
                    border={config.colors.modules[item.module] || 'black'}
                    id={
                        items[index - 1] && items[index - 1].module !== item.module
                          ? item.module.toLowerCase()
                          : ''
                      }
                  >
                    {!items[index - 1] ? items[0].module : ''}
                    {items[index - 1] && items[index - 1].module !== item.module
                        ? item.module
                        : ''}
                  </ModuleCell>
                  <LevelCell color={config.colors.levels[item.level]}>{item.level}</LevelCell>
                  <MessageCell>{item.message}</MessageCell>
                </ResultLine>
                ))
              : null}
          </tbody>
        </ResultTable>
      </Container>
    );
  }
}

TestResult.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default TestResult;
