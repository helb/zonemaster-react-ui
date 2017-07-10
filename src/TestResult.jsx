import React from 'react';
import PropTypes from 'prop-types';

export default class TestResult extends React.PureComponent {
  render() {
    return (
      <ul>
        <li>
          domain: {this.props.data ? this.props.data.params.domain : 'loading'}
        </li>
        <li>
          date:{' '}
          {this.props.data ? new Date(this.props.data.creation_time).toLocaleString() : 'loading'}
        </li>
      </ul>
    );
  }
}

TestResult.propTypes = {
  data: PropTypes.shape({
    creation_time: PropTypes.string,
    params: PropTypes.shape({
      domain: PropTypes.string
    })
  })
};

TestResult.defaultProps = {
  data: {}
};
