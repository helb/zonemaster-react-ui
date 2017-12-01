import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './assets/icons/favicon.svg';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 1em calc(1rem + 10vw);
    color: #666;
    font-weight: lighter;
    font-size: calc(2em + 1vw);
    white-space: nowrap;

    @media (max-width: 700px) {
      margin: 1em 1rem;
    }

    svg {
      margin-right: 0.1em;
      height: 1.4em;
      width: 1.4em;
      vertical-align: middle;
    }

    .beta {
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: normal;
      transform: translate(-2.9em, 0.9em) rotate(-8deg);
      background: rgba(170, 170, 170, 0.6);
      color: #fff;
      padding: 0.1rem 0.4rem;
      display: inline-block;
    }
  }
`;

const Navigation = styled.nav`
  border: 0.1rem solid #ddd;
  border-left: 0;
  border-right: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 0 calc(1rem + 10vw);

  @media (max-width: 700px) {
    padding: 0 1rem;
  }

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
      {props.beta ? <span className="beta">beta</span> : null}
    </h1>
    <Navigation>
      <Link to="/">New test</Link>
      <Link to="/result">Results</Link>
    </Navigation>
  </HeaderContainer>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  beta: PropTypes.bool
};

export default Header;
