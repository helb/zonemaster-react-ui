import React from 'react';
import PropTypes from 'prop-types';
import TestResult from './TestResult.jsx';
import TestForm from './TestForm.jsx';
import ResultList from './ResultList.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import config from '../config.json';

injectGlobal`
  body {
    margin: 0;
    font: 11pt/1.5em sans-serif;
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const AppContent = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <AppContainer>
          <Header title={config.text.title} />
          <AppContent>
          <Switch>
            <Route exact path="/" component={TestForm} />
            <Route exact path="/result" component={ResultList} />
            <Route path="/result/:id" component={TestResult} />
            <Route render={() => <p>Page not found. :(</p>} />
          </Switch>
        </AppContent>
        <Footer text={config.text.footer} logo={config.footerLogo} />
        </AppContainer>
      </Router>
    );
  }
}
