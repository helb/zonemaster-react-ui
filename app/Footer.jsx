import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import backend from './backend';

const FooterContainer = styled.footer`
  border-top: 0.1rem solid #ddd;
  margin-top: 1rem;
  padding: 1rem 14vw;
  display: flex;
  align-items: center;

  .footer-text {
    flex: 1;
  }

  .footer-logo {
    color: black;
    text-decoration: none;
    height: 1.5em;
    margin-left: 2em;

    img {
      height: 1.5em;
      vertical-align: middle;
    }
  }
`;

class Footer extends React.Component {
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
      <FooterContainer>
        <p className="footer-text">
          {this.props.text} |{' '}
          {this.state.version ? `backend : ${this.state.version.zonemaster_backend} ` : null}
          {this.state.version ? `| engine : ${this.state.version.zonemaster_engine}` : null}
        </p>
        <a href={this.props.logoLink} className="footer-logo">
          <img alt="CZ.NIC" src={this.props.logo} />
        </a>
      </FooterContainer>
    );
  }
}

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  logoLink: PropTypes.string.isRequired
};

export default Footer;
