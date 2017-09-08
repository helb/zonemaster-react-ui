import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);
ReactDOM.render(<App />, mountNode);

const render = () => {
  ReactDOM.render(<App />, mountNode);
};

render();

module.hot.accept('./App.jsx', render);
