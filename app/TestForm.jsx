import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import backend from './backend';
import db from './db';
import Button from './styled/Button';
import Progress from './styled/Progress';

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Form = styled.form`
  border: 0.2em solid #ddd;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  line-height: 2rem;
  }
`;

const DomainInput = styled.label`
  width: 100%;
  display: flex;
  white-space: nowrap;

  input {
    flex: 1;
    margin-left: 1rem;
    padding: 0.5rem;
  }
`;

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

  componentDidMount() {
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
    if (this.state.validParams) {
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
      db.add({
        id: this.state.testId,
        domain: this.state.testOptions.domain,
        date: new Date()
      });
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
              ref={(input) => {
                this.domainInput = input;
              }}
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
          {!this.state.testRunning ? (
            <Button type="submit" disabled={this.state.testRunning || !this.state.validParams}>
              Start
            </Button>
          ) : (
            <Progress value={this.state.testProgress}>{this.state.testProgress} %</Progress>
          )}
          {this.state.testId && this.state.testProgress === 100 ? (
            <Redirect push to={`/result/${this.state.testId}`} />
          ) : (
            ''
          )}
        </Form>
      </FormContainer>
    );
  }
}