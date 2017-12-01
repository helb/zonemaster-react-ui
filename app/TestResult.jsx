import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import backend from './backend';
import config from '../config.json';
import LevelFilter from './LevelFilter';
import ResultLog from './ResultLog';
import ResultBar from './ResultBar';

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2em;
  flex-wrap: wrap;
`;

const Heading = styled.div`
  flex: 1;
`;

const Domain = styled.h2`
  font-size: 1.667em;
  margin-bottom: 1em;
`;

const Datetime = styled.h3`
  font-size: 1.3em;
  margin-bottom: 1em;
`;

const { levels } = config;

class TestResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLevel: levels.indexOf(config.defaultLevel)
    };
    this.changeLevel = this.changeLevel.bind(this);
  }

  componentWillMount() {
    this.getTestResult(this.props.match.params.id);
  }

  async getTestResult(id) {
    const testResult = await backend.testResult(id);
    this.setState({ testResult });
    document.title = `${testResult.params.domain} | Zonemaster`;
  }

  changeLevel(e) {
    this.setState({ maxLevel: parseInt(e.target.value, 10) });
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
          <LevelFilter levels={levels} value={this.state.maxLevel} onChange={this.changeLevel} />
        </Header>
        {this.state.testResult ? (
          <ResultBar data={this.state.testResult} levels={levels} onChange={this.changeLevel} />
        ) : null}
        {this.state.testResult ? (
          <ResultLog data={this.state.testResult} levels={levels} level={this.state.maxLevel} />
        ) : null}
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
