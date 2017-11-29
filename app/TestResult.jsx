import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import backend from './backend';
import config from '../config.json';

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2em;
  border-bottom: 0.1rem solid #ddd;
`;

const Heading = styled.div`
  flex: 1;
`;

const LevelFilter = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 1em;
  }

  input {
    appearance: none;
    height: 0.1em;
    background: #ccc;
    outline: none;
    padding: 0;
    margin: 0;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 2em;
      height: 2em;
      border-radius: 50%;
      background: #aaa;
      cursor: pointer;
      transition: background 0.15s ease-in-out;

      &:hover {
        background: #999;
      }
    }

    &:active::-webkit-slider-thumb {
      background: #999;
    }

    &::-moz-range-thumb {
      width: 2em;
      height: 2em;
      border: 0;
      border-radius: 50%;
      background: #aaa;
      cursor: pointer;
      transition: background 0.15s ease-in-out;

      &:hover {
        background: #999;
      }
    }

    &:active::-moz-range-thumb {
      background: #999;
    }
  }

  select {
    margin-left: 1em;
    padding: 0.5em;
    background: transparent;
    border: 1px solid #aaa;
    font-size: 1rem;
  }
`;

const Domain = styled.h2`
  font-size: 1.667em;
  margin-bottom: 1em;
`;

const Datetime = styled.h3`
  font-size: 1.3em;
  margin-bottom: 1em;
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

const levels = ['DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL'].reverse();

class TestResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLevel: 3
    };
    this.changeLevel = this.changeLevel.bind(this);
  }

  componentWillMount() {
    this.getTestResult(this.props.match.params.id);
  }

  async getTestResult(id) {
    const testResult = await backend.testResult(id);
    this.setState({ testResult });
  }

  changeLevel(e) {
    this.setState({ maxLevel: e.target.value });
  }

  render() {
    if (!backend.validateTestID(this.props.match.params.id)) {
      return <p>Invalid test ID.</p>;
    }
    return (
      <React.Fragment>
        <Header>
          <Heading>
            <Domain>{this.state.testResult ? this.state.testResult.params.domain : '…'}</Domain>
            <Datetime>
              {' '}
              {this.state.testResult
                ? new Date(this.state.testResult.creation_time).toLocaleString()
                : '…'}
            </Datetime>
          </Heading>
          <LevelFilter>
            <span>Log level:</span>
            <input
              type="range"
              onChange={this.changeLevel}
              value={this.state.maxLevel}
              min={0}
              max={levels.length - 1}
            />
            <select onChange={this.changeLevel} value={this.state.maxLevel}>
              {levels.map((level, index) => (
                <option key={level} value={index}>
                  {level}
                </option>
              ))}
            </select>
          </LevelFilter>
        </Header>
        <ResultTable>
          <tbody>
            {this.state.testResult
              ? this.state.testResult.results
                .filter(item => levels.indexOf(item.level) <= this.state.maxLevel)
                .map((item, index, items) => (
                  <ResultLine key={btoa(index + item.message)}>
                    <ModuleCell
                      color={config.colors.modules[item.module] || 'white'}
                      border={config.colors.modules[item.module] || 'black'}
                      id={
                          items[index - 1] && items[index - 1].module !== item.module
                            ? item.module.toLowerCase()
                            : null
                      }
                    >
                      {!items[index - 1] ? items[0].module : ''}
                      {items[index - 1] && items[index - 1].module !== item.module
                        ? item.module
                        : null}
                    </ModuleCell>
                    <LevelCell color={config.colors.levels[item.level]}>{item.level}</LevelCell>
                    <MessageCell>{item.message}</MessageCell>
                  </ResultLine>
                ))
              : null}
          </tbody>
        </ResultTable>
      </React.Fragment>
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
