import styled from 'styled-components';

export default styled.button`
  padding: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  border: 0.1em solid #666;
  background: transparent;
  color: #666;
  font-size: 1rem;
  line-height: 1em;

  &:disabled {
    color: #aaa;
    border-color: #aaa;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    &:hover,
    &:focus {
      background: #666;
      color: white;
    }
  }
`;
