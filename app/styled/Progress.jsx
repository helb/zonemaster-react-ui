import styled from 'styled-components';

export default styled.div`
  padding: 0.5rem;
  margin-top: 1rem;
  border: 0.1em solid #666;
  color: ${props => (props.value < 90 ? '#666' : 'white')};
  font-size: 1rem;
  line-height: 1.4em;
  padding-left: ${props =>
    (props.value < 90 ? `calc(${props.value}% + 0.25em)` : `calc(${props.value}% - 3em)`)};
  background: ${props =>
    (props.value
      ? `linear-gradient(to right, #666 ${props.value}%, white calc(${props.value}% + 1px));`
      : 'transparent')};
  transition: all 0.33s;
`;
