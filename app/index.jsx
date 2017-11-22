/* eslint global-require: 0 */
import React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';
import App from './App';
import config from '../config.json';

document.title = config.text.title;

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewRoot = require('./App').default;
    render(
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
