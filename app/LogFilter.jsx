import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from './styled/Slider';
import config from '../config.json';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  flex-wrap: wrap;

  div {
    margin-right: 1em;
    padding: 0.5em 0;
    display: flex;
    align-items: center;
  }

  span {
    white-space: nowrap;

    &:first-child {
      margin-right: 0.5em;
    }
  }

  select {
    cursor: pointer;
    padding: 0.25em;
    background: transparent;
    border: 1px solid #aaa;
    font-size: 1rem;
    margin-left: 0.5em;
  }
`;

const LogFilter = ({
  levels, currentLevel, currentModule, changeLevel, changeModule
}) => (
  <Container>
    <div>
      <span>Log level:</span>
      <Slider
        type="range"
        onChange={changeLevel}
        value={currentLevel}
        min={0}
        max={levels.length - 1}
      />
      <select onChange={changeLevel} value={currentLevel}>
        {levels.map((level, index) => (
          <option key={level} value={index}>
            {level}
          </option>
        ))}
      </select>
    </div>
    <div>
      <span>Module:</span>
      <select onChange={changeModule} value={currentModule}>
        <option key="all" value="">
          (all)
        </option>
        {config.modules.map(module => (
          <option key={module} value={module}>
            {module}
          </option>
        ))}
      </select>
    </div>
  </Container>
);

LogFilter.propTypes = {
  levels: PropTypes.array.isRequired,
  currentLevel: PropTypes.number.isRequired,
  currentModule: PropTypes.string,
  changeLevel: PropTypes.func.isRequired,
  changeModule: PropTypes.func.isRequired
};

export default LogFilter;
