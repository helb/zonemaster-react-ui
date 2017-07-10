import React from 'react';
import ReactDOM from 'react-dom';
import config from '../config.json';
import App from './App.jsx';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);
ReactDOM.render(<App backendUrl={config.backendUrl} />, mountNode);
