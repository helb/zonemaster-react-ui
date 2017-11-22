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
  }

  async getResults() {
    this.setState({
      results: await db.list()
    });
  }

  render() {
    return (
      <div>
        {this.state.results.map(item => (
          <p key={item.id}>
            <Link to={`/result/${item.id}`}>
              {new Date(item.date).toLocaleString()} – {item.domain}
            </Link>
          </p>
        ))}
      </div>
    );
  }
}

export default ResultList;
