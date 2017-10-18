import React from 'react';
import PropTypes from 'prop-types';
import backend from './backend.js';
import styled from 'styled-components';
import { Redirect } from 'react-router';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  border: 0.1em solid #ddd;
  padding: 1rem;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  line-height: 2rem;
`

const DomainInput = styled.label`
  width: 100%;
  display: flex;

  input {
    flex: 1;
    margin-left: 1rem;
    padding: 0.5rem;
  }
`

export default class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testOptions: {
        ipv4: true,
        ipv6: true
      },
      validParams: false,
      testRunning: false
    };
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateTestProgress = this.updateTestProgress.bind(this);
  }

  componentWillMount() {
    this.getVersionInfo();
  }

  componentDidMount(){
    this.domainInput.focus();
  }

  handleDomainChange(event) {
    event.preventDefault();
    const newState = Object.assign({}, this.state);
    newState.testOptions.domain = event.target.value;
    this.validateParams();
    this.setState(newState);
  }

  handleOptionChange(event) {
    const newState = Object.assign({}, this.state);
    newState.testOptions[event.target.name] = event.target.checked;
    this.setState(newState);
    this.validateParams();
    event.stopPropagation();
  }

  async validateParams() {
    const isValid = await backend.validateSyntax(this.state.testOptions);
    const newState = Object.assign({}, this.state);
    newState.validParams = isValid.ok;
    this.setState(newState);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if(this.state.validParams) {
      this.startDomainTest();
    }
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
    if (testProgress.progress === 100) {
      this.setState({ testRunning: false });
      const currentResults = window.localStorage.results ? JSON.parse(window.localStorage.results) : [];
      currentResults.push({
        i: this.state.testId,
        d: this.state.testOptions.domain,
        t: +new Date()
      });
      window.localStorage.results = JSON.stringify(currentResults);
      clearInterval(this.updateProgressTimer);
    }
    this.setState({ testProgress: testProgress.progress });
  }

  render() {
    return (
      <FormContainer>
          <Form onSubmit={this.handleFormSubmit}>
            <DomainInput>
              Domain name:
              <input
                type="text"
                onChange={this.handleDomainChange}
                disabled={this.state.testRunning}
                ref={(input) => { this.domainInput = input; }}
              />
            </DomainInput>
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
            <button type="submit" disabled={this.state.testRunning || !this.state.validParams}>
              Start
            </button>
          </Form>
        <ul>
          <li>{this.state.testRunning ? <p>RUNNING</p> : <p>-</p>}</li>
          <li>{this.state.validParams ? <p>VALID</p> : <p>INVALID</p>}</li>
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
            result: {this.state.testId && this.state.testProgress === 100
              ? (<Redirect push to={`/result/${this.state.testId}`} />) : ''}
          </li>
        </ul>
      </FormContainer>
    );
  }
}
