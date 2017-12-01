import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import db from './db';

const DateCell = styled.td`
  padding: 0.25em 0 0.25em 0;
`;

const DomainCell = styled.td`
  padding: 0.25em;
  font-weight: bold;

  a {
    &,
    &:link,
    &:visited {
      color: #333;
    }
  }
`;

class ResultList extends React.Component {
  constructor() {
    super();

    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.getResults();
    document.title = 'Results | Zonemaster';
  }

  async getResults() {
    this.setState({
      results: await db.list()
    });
  }

  render() {
    return (
      <table>
        {this.state.results.length > 0 ? (
          this.state.results.map(item => (
            <tr key={item.id}>
              <DateCell>{new Date(item.date).toLocaleString()}</DateCell>
              <DomainCell>
                <Link to={`/result/${item.id}`}>{item.domain}</Link>
              </DomainCell>
            </tr>
          ))
        ) : (
          <p>
            No tests sent from your browser (yet). <Link to="/">Start a test</Link>.
          </p>
        )}
      </table>
    );
  }
}

export default ResultList;
