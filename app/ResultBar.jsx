import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import config from '../config.json';

const Bar = styled.div`
  display: flex;
  margin: 1em 0 3em;
  border-bottom: 1em solid #ddd;
`;

const Module = styled.div`
  padding-top: 3em;
  flex: 1;
  display: flex;
  justify-content: center;
  transform: translate(0, 1.5em);

  h4 {
    width: 0;
    height: 0;
    transform-origin: left center;
    transform: translate(0, -1.5em) rotate(-45deg);
    line-height: 2em;
    font-size: 1rem;
    color: #666;
    font-weight: ${props => (props.current ? 'bold' : 'normal')};
  }

  button {
    font-size: 1rem;
    width: 2em;
    height: 2em;
    display: inline-block;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s;
    background: ${props => Object.values(config.colors.levels).reverse()[props.maxLevel]};
    outline: none;
    transform: ${props => (props.current ? 'scale(1.2)' : 'none')};

    &:hover,
    &:focus {
      transform: scale(1.2);
    }
  }
`;

const ResultBar = ({
  data, levels, changeLevel, changeModule, currentModule
}) => (
  <Bar>
    {config.modules.map(module => (
      <Module
        key={module}
        current={currentModule === module}
        maxLevel={data.results
          .filter(item => item.module === module)
          .map(item => levels.indexOf(item.level))
          .reduce((a, b) => Math.min(a, b))}
      >
        <h4>{module}</h4>
        <button
          data-module={module}
          value={data.results
            .filter(item => item.module === module)
            .map(item => levels.indexOf(item.level))
            .reduce((a, b) => Math.min(a, b))}
          onClick={(e) => {
            changeLevel(e);
            changeModule(e);
          }}
        />
      </Module>
    ))}
  </Bar>
);

ResultBar.propTypes = {
  data: PropTypes.object.isRequired,
  levels: PropTypes.array.isRequired,
  changeLevel: PropTypes.func.isRequired,
  changeModule: PropTypes.func.isRequired,
  currentModule: PropTypes.string
};

export default ResultBar;
