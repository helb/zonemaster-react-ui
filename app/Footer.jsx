import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import backend from './backend';

const FooterContainer = styled.footer`
  border-top: 0.1rem solid #ddd;
  margin-top: 1rem;
  padding: 1rem calc(1rem + 10vw);
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 700px) {
    padding: 1rem;
  }
`;

const Text = styled.p`
  flex: 1;
  margin-bottom: 1em;

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
`;

const Logo = styled.a`
  color: black;
  text-decoration: none;
  height: 1.5em;
  margin-left: 2em;

  img {
    height: 1.5em;
    vertical-align: middle;
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
        <Text>
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
        </Text>
        {this.props.data.logo ? (
          <Logo href={this.props.data.logo.link} className="footer-logo">
            <img alt={this.props.data.logo.link} src={this.props.data.logo.image} />
          </Logo>
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
