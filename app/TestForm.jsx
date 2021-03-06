import React from 'react';
import styled from 'styled-components';
import backend from './backend';
import history from './history';
import db from './db';
import config from '../config.json';
import Button from './styled/Button';
import Progress from './styled/Progress';
import Image from './assets/form_bottom.svg';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    height: 4em;
    margin: 1em 0;
  }
`;

const Text = styled.p`
  margin: 1em 0;
`;

const Form = styled.form`
  border: 0.2em solid #ddd;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  line-height: 2rem;
  align-self: center;
  margin: 2em auto;
`;

const DomainInput = styled.label`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  input {
    min-width: 10vw;
    border: 0.1em solid #666;
    flex: 1;
    margin-left: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    text-transform: lowercase;
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

  componentDidMount() {
    this.domainInput.focus();
    document.title = 'Zonemaster';
  }

  handleDomainChange(event) {
    event.preventDefault();
    const newState = Object.assign({}, this.state);
    newState.testOptions.domain = event.target.value.toLowerCase();
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
      history.push(`/result/${this.state.testId}`);
    }
    this.setState({ testProgress: testProgress.progress });
  }

  render() {
    return (
      <FormContainer>
        <Text>
          {config.text.form.top}
        </Text>
        <Form onSubmit={this.handleFormSubmit}>
          <DomainInput>
            <span>Domain name:</span>
            <input
              type="text"
              onChange={this.handleDomainChange}
              disabled={this.state.testRunning}
              ref={(input) => {
                this.domainInput = input;
              }}
            />
          </DomainInput>
          {config.showIpOptions ? (
            <React.Fragment>
              <label htmlFor="ipv4">
                <input
                  type="checkbox"
                  id="ipv4"
                  name="ipv4"
                  onChange={this.handleOptionChange}
                  disabled={this.state.testRunning || !this.state.testOptions.ipv6}
                  checked={this.state.testOptions.ipv4}
                />
                IPv4
              </label>
              <label htmlFor="ipv6">
                <input
                  type="checkbox"
                  id="ipv6"
                  name="ipv6"
                  onChange={this.handleOptionChange}
                  disabled={this.state.testRunning || !this.state.testOptions.ipv4}
                  checked={this.state.testOptions.ipv6}
                />
                IPv6
              </label>
            </React.Fragment>
          ) : null}
          {!this.state.testRunning ? (
            <Button type="submit" disabled={this.state.testRunning || !this.state.validParams}>
              Start
            </Button>
          ) : (
            <Progress value={this.state.testProgress}>{this.state.testProgress} %</Progress>
          )}
        </Form>
        <Text>
          {config.text.form.bottom}
        </Text>
        <Image />
      </FormContainer>
    );
  }
}
