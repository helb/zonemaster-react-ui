import React from 'react';
import PropTypes from 'prop-types';
import backend from './backend.js';
import styled from 'styled-components';
import { Redirect } from 'react-router';

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const Form = styled.form`
  border: 0.2em solid #ddd;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  line-height: 2rem;

  button {
    padding: 0.5rem;
    cursor: pointer;
    margin-top: 1rem;
    border: 0.2em solid #666;
    background: transparent;
    color: #666;
    font-size: 1rem;
    line-height: 1em;

    &:not(:disabled) {
      &:hover,
      &:focus {
        background: #666;
        color: white;
      }
    }

    &:disabled {
      color: #aaa;
      border-color: #aaa;
      cursor: not-allowed;
    }
  }
`

const Progress = styled.div`
  padding: 0.5rem;
  margin-top: 1rem;
  border: 0.2em solid #666;
  color: ${props => props.value < 90 ? `#666` : `white`};
  font-size: 1rem;
  line-height: 1em;
  padding-left: ${props => props.value < 90 ? `calc(${props.value}% + 0.25em)` : `calc(${props.value}% - 3em)`};
  background: ${props => props.value ? `linear-gradient(to right, #666 ${props.value}%, white calc(${props.value}% + 1px));` : `transparent`};
  transition: all 0.33s;
`

const DomainInput = styled.label`
  width: 100%;
  display: flex;
  white-space: nowrap;

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
              IPv4
            </label>
            <label>
              <input
                type="checkbox"
                name="ipv6"
                onChange={this.handleOptionChange}
                disabled={this.state.testRunning || !this.state.testOptions.ipv4}
                checked={this.state.testOptions.ipv6}
              />
              IPv6
            </label>
            { !this.state.testRunning ?
            (<button type="submit" disabled={this.state.testRunning || !this.state.validParams}>
              Start
            </button>) :
            (<Progress value={this.state.testProgress}>{this.state.testProgress} %</Progress>)
            }
            {this.state.testId && this.state.testProgress === 100
              ? (<Redirect push to={`/result/${this.state.testId}`} />) : ''}
          </Form>
      </FormContainer>
    );
  }
}
