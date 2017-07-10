import React from 'react';
import PropTypes from 'prop-types';
import backend from './backend.js';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.getVersionInfo();
  }

  async getVersionInfo() {
    const version = await backend.versionInfo();
    this.setState({ version });
  }

  render() {
    return (
      <ul>
        <li>
          backend: {this.state.version ? this.state.version.zonemaster_backend : 'loading'}
        </li>
        <li>
          engine: {this.state.version ? this.state.version.zonemaster_engine : 'loading'}
        </li>
      </ul>
    );
  }
}
