import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import backend from './backend';
import config from '../config.json';
import LogFilter from './LogFilter';
import ResultLog from './ResultLog';
import ResultBar from './ResultBar';
import Spinner from './styled/Spinner';

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

const { levels, defaultLevel } = config;

class TestResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLevel: levels.indexOf(defaultLevel),
      moduleFilter: ''
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.setModuleFilter = this.setModuleFilter.bind(this);
  }

  componentWillMount() {
    this.getTestResult(this.props.match.params.id);
  }

  async getTestResult(id) {
    const testResult = await backend.testResult(id);
    this.setState({ testResult });
    document.title = `${testResult.params.domain} | Zonemaster`;
  }

  setModuleFilter(e) {
    this.setState({ moduleFilter: e.target.dataset.module || e.target.value });
  }

  changeLevel(e) {
    this.setState({ maxLevel: parseInt(e.target.value, 10) });
  }

  render() {
    if (!backend.validateTestID(this.props.match.params.id)) {
      return <p>Invalid test ID.</p>;
    }
    if (this.state.testResult) {
      return (
        <React.Fragment>
          <Header>
            <Heading>
              <Domain>{this.state.testResult.params.domain}</Domain>
              <Datetime>{new Date(this.state.testResult.creation_time).toLocaleString()}</Datetime>
            </Heading>
          </Header>
          <ResultBar
            data={this.state.testResult}
            levels={levels}
            changeLevel={this.changeLevel}
            changeModule={this.setModuleFilter}
            currentModule={this.state.moduleFilter}
            currentLevel={this.state.maxLevel}
          />
          <LogFilter
            levels={levels}
            currentLevel={this.state.maxLevel}
            changeLevel={this.changeLevel}
            currentModule={this.state.moduleFilter}
            changeModule={this.setModuleFilter}
          />
          <ResultLog
            data={this.state.testResult}
            levels={levels}
            level={this.state.maxLevel}
            module={this.state.moduleFilter}
          />
        </React.Fragment>
      );
    }
    return <Spinner text="Loading test result from Zonemaster backend…" />;
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
