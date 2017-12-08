import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1em;
  animation: fadeIn 0.33s ease-in;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Text = styled.p`
  font-size: ${props => Math.max(props.size / 50, 1)}em;
  margin-top: 1em;
  line-height: 1.2em;
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: ${({ size }) => `-${size / 2}px 0 0 -${size / 2}px`};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  & .path {
    stroke: ${({ color }) => color};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Spinner = ({ color = '#0c2e82', size = 60, text }) => (
  <Container size={size}>
    <StyledSpinner color={color} size={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="path"
        cx={size / 2}
        cy={size / 2}
        r={(size / 2) - 5}
        fill="none"
        strokeWidth={size / 12.5}
      />
    </StyledSpinner>
    {text && <Text size={size}>{text}</Text>}
  </Container>
);

Spinner.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
};

export default Spinner;
