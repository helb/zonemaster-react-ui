// window.localStorage.results
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class ResultList extends React.PureComponent {
  render() {
    return (
      <div>
        {window.localStorage.results
          ? JSON.parse(window.localStorage.results)
              .reverse()
              .map((item, index, items) => (
                <p key={index}>
                  <Link to={`/result/${item.i}`}>
                    {new Date(item.t).toLocaleString()} – {item.d}
                  </Link>
                </p>
              ))
          : ''}
      </div>
    );
  }
}
