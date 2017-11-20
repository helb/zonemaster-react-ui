import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 1em 1rem;
    color: #666;
    font-weight: lighter;
    font-size: 3em;
  }
`

const Navigation = styled.nav`
  border: 0.1rem solid #ddd;
  border-left: 0;
  border-right: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 0 1rem;

  a {
    line-height: 2rem;
    margin: 0 1rem 0 0;
    color: #333;
    text-decoration: none;
    font-weight: bold;
    white-space: nowrap;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`

export default class Header extends React.PureComponent {
  render() {
    return (
      <HeaderContainer>
        <h1>{this.props.title}</h1>
        <Navigation>
          <Link to="/">New test</Link>
          <Link to="/undelegated">Undelegated domain test</Link>
          <Link to="/result">Results</Link>
        </Navigation>
      </HeaderContainer>
    )
  }
}
