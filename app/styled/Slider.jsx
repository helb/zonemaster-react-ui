import styled from 'styled-components';

export default styled.input`
  appearance: none;
  height: 0.1em;
  font-size: 1rem;
  background: #ccc;
  outline: none;
  padding: 0;
  margin: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: #aaa;
    cursor: pointer;
    transition: background 0.15s ease-in-out;
  }

  &::-moz-range-thumb {
    width: 1.5em;
    height: 1.5em;
    border: 0;
    border-radius: 50%;
    background: #aaa;
    cursor: pointer;
    transition: background 0.15s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background: #999;
  }

  &::-moz-range-thumb:hover {
    background: #999;
  }

  &:active::-moz-range-thumb {
    background: #999;
  }

  &:active::-webkit-slider-thumb {
    background: #999;
  }
`;
