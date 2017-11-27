import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './assets/icons/favicon.svg';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 1em auto 1em 14vw;
    color: #666;
    font-weight: lighter;
    font-size: 3em;
    white-space: nowrap;

    svg {
      margin-right: 0.3em;
    }
  }
`;

const Navigation = styled.nav`
  border: 0.1rem solid #ddd;
  border-left: 0;
  border-right: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 0 14vw;

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
`;

const Header = props => (
  <HeaderContainer>
    <h1>
      <Logo />
      {props.title}
    </h1>
    <Navigation>
      <Link to="/">New test</Link>
      <Link to="/undelegated">Undelegated domain test</Link>
      <Link to="/result">Results</Link>
    </Navigation>
  </HeaderContainer>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
