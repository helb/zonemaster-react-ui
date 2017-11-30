import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import TestResult from './TestResult';
import TestForm from './TestForm';
import ResultList from './ResultList';
import Header from './Header';
import Footer from './Footer';
import config from '../config.json';
import history from './history';
import piwik from './piwik';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.div`
  flex: 1;
  padding: 2rem 14vw;
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <Router history={piwik.connectToHistory(history)}>
    <AppContainer>
      <Header title={config.text.title} beta={config.beta} />
      <AppContent>
        <Switch>
          <Route exact path="/" component={TestForm} />
          <Route exact path="/result" component={ResultList} />
          <Route path="/result/:id" component={TestResult} />
          <Route render={() => <p>Page not found. :(</p>} />
        </Switch>
      </AppContent>
      <Footer data={config.text.footer} />
    </AppContainer>
  </Router>
);

export default App;
