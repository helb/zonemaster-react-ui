import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import db from './db';

const DateCell = styled.td`
  padding: 0.25em 0 0.25em 0;
  white-space: nowrap;
`;

const DomainCell = styled.td`
  padding: 0.25em;
  font-weight: bold;
  white-space: nowrap;

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
        <tbody>
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
            <tr>
              <td>
                No tests sent from your browser (yet). <Link to="/">Start a test</Link>.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default ResultList;
