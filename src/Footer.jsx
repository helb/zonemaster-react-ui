import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  border-top: 0.1rem solid #ddd;
  margin-top: 1rem;
  padding: 1rem;
`

export default class Footer extends React.PureComponent {
  render() {
    return (
      <FooterContainer>
        <p>{this.props.text}</p>
      </FooterContainer>
    )
  }
}
