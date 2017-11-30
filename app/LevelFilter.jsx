import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from './styled/Slider';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;

  span {
    margin-right: 1em;
    white-space: nowrap;
  }

  select {
    cursor: pointer;
    margin-left: 1em;
    padding: 0.5em;
    background: transparent;
    border: 1px solid #aaa;
    font-size: 1rem;
  }
`;

const LevelFilter = ({ levels, value, onChange }) => (
  <Container>
    <span>Log level:</span>
    <Slider type="range" onChange={onChange} value={value} min={0} max={levels.length - 1} />
    <select onChange={onChange} value={value}>
      {levels.map((level, index) => (
        <option key={level} value={index}>
          {level}
        </option>
      ))}
    </select>
  </Container>
);

LevelFilter.propTypes = {
  levels: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LevelFilter;
