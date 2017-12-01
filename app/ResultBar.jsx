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

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      transform: scale(1.2);
    }

    &:disabled {
      cursor: default;
    }
  }
`;

const ResultBar = ({
  data, levels, changeLevel, changeModule, currentModule
}) => {
  function getModule(name) {
    const items = data.results.filter(item => item.module === name);

    const maxLevel =
      items.length > 0
        ? items.map(item => levels.indexOf(item.level)).reduce((a, b) => Math.min(a, b))
        : null;

    return (
      <Module key={name} current={currentModule === name} maxLevel={maxLevel}>
        <h4>{name}</h4>
        <button
          data-module={name}
          value={maxLevel}
          disabled={items.length < 1}
          onClick={(e) => {
            changeLevel(e);
            changeModule(e);
          }}
        />
      </Module>
    );
  }
  return <Bar>{config.modules.map(module => getModule(module))}</Bar>;
};

ResultBar.propTypes = {
  data: PropTypes.object.isRequired,
  levels: PropTypes.array.isRequired,
  changeLevel: PropTypes.func.isRequired,
  changeModule: PropTypes.func.isRequired,
  currentModule: PropTypes.string
};

export default ResultBar;
