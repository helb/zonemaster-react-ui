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

    a {
      &,
      &:link,
      &:visited {
        color: #333;
      }
    }

    span {
      white-space: nowrap;
      display: inline-block;

      &:not(:first-child) {
        padding-left: 0.33em;
      }
    }
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
          <span>{this.props.data.text} </span>
          {this.props.data.mail ? (
            <span>
              | <a href={`mailto:${this.props.data.mail}`}>{this.props.data.mail}</a>
            </span>
          ) : null}
          {this.state.version ? (
            <span> | backend: {this.state.version.zonemaster_backend} </span>
          ) : null}
          {this.state.version ? (
            <span> | engine: {this.state.version.zonemaster_engine} </span>
          ) : null}
        </p>
        {this.props.data.logo ? (
          <a href={this.props.data.logo.link} className="footer-logo">
            <img alt={this.props.data.logo.link} src={this.props.data.logo.image} />
          </a>
        ) : null}
      </FooterContainer>
    );
  }
}

Footer.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    mail: PropTypes.string,
    logo: PropTypes.shape({
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  }).isRequired
};

export default Footer;
