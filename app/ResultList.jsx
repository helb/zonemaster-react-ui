import React from 'react';
import { Link } from 'react-router-dom';
import db from './db';

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
      <React.Fragment>
        {this.state.results.length > 0 ? (
          this.state.results.map(item => (
            <p key={item.id}>
              <Link to={`/result/${item.id}`}>
                {new Date(item.date).toLocaleString()} – {item.domain}
              </Link>
            </p>
          ))
        ) : (
          <p>
            No tests sent from your browser (yet). <Link to="/">Start a test</Link>.
          </p>
        )}
      </React.Fragment>
    );
  }
}

export default ResultList;
