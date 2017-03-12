import React, { Component, PropTypes } from 'react';
import JSONPretty from 'react-json-pretty';

export default class ResponseBlock extends Component {

  constructor() {
    super();

    this.state = {
      expanded: true
    };
  }

  setExpanded(e) {
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    });
  }

  renderResponse() {
    return (
      <div
        className="card-response__content"
      >
        <JSONPretty
          json={this.props.content}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="card-response">
        <h6
          className="card-response__title">
          Response
          <a
            onClick={this.setExpanded.bind(this)}
            className="card-response__button">
            {this.state.expanded ? 'Hide' : 'Show'}
          </a>
        </h6>
        {this.state.expanded && this.renderResponse()}
      </div>
    );
  }
}
ResponseBlock.propTypes = {
  content: PropTypes.object,
};
