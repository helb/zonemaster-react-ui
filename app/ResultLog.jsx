import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import config from '../config.json';

const ResultTable = styled.table`
  font-family: monospace;
  border-collapse: collapse;
  max-width: 100vw;
`;

const ResultLine = styled.tr`
  vertical-align: top;
`;

const ModuleCell = styled.td`
  border-left: 0.5em solid ${props => props.border};
  font-weight: bold;
  padding: 0.5em;
  color: ${props => props.color};
`;

const LevelCell = styled.td`
  font-weight: bold;
  padding: 0.5em;
  color: ${props => props.color};
`;

const MessageCell = styled.td`
  padding: 0.5em;
  word-break: break-all;
`;

const ResultLog = ({ data, level, levels }) => (
  <ResultTable>
    <tbody>
      {data
        ? data.results
            .filter(item => levels.indexOf(item.level) <= level)
            .map((item, index, items) => (
              <ResultLine key={btoa(index + item.message)}>
                <ModuleCell
                  color={config.colors.modules[item.module] || 'white'}
                  border={config.colors.modules[item.module] || 'black'}
                  id={
                    items[index - 1] && items[index - 1].module !== item.module
                      ? item.module.toLowerCase()
                      : null
                  }
                >
                  {!items[index - 1] ? items[0].module : ''}
                  {items[index - 1] && items[index - 1].module !== item.module ? item.module : null}
                </ModuleCell>
                <LevelCell color={config.colors.levels[item.level]}>{item.level}</LevelCell>
                <MessageCell>{item.message}</MessageCell>
              </ResultLine>
            ))
        : null}
    </tbody>
  </ResultTable>
);

ResultLog.propTypes = {
  data: PropTypes.object,
  level: PropTypes.number.isRequired,
  levels: PropTypes.array.isRequired
};

export default ResultLog;
