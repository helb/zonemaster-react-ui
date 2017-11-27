import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import TestResult from './TestResult';
import TestForm from './TestForm';
import ResultList from './ResultList';
import Header from './Header';
import Footer from './Footer';
import config from '../config.json';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const App = () => (
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
      <Footer text={config.text.footer} logo={config.footerLogo} logoLink={config.footerLink} />
    </AppContainer>
  </Router>
);

export default App;
