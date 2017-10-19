import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  border-top: 0.1rem solid #ddd;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;

  .footer-text {
    flex: 1;
  }

  .footer-logo {
    color: black;
    text-decoration: none;
    height: 1.5em;

    img {
      height: 1.5em;
      vertical-align: middle;
    }
  }
`

export default class Footer extends React.PureComponent {
  render() {
    return (
      <FooterContainer>
        <p className="footer-text">{this.props.text}</p>
        <a href="https://www.nic.cz/" className="footer-logo">
          <img alt="CZ.NIC" src={this.props.logo} />
        </a>
      </FooterContainer>
    )
  }
}
