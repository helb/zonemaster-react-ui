import React from 'react';
import PropTypes from 'prop-types';
import TestResult from './TestResult.jsx';
import Info from './Info.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Info} />
            <Route path="/test/:id" component={TestResult} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
