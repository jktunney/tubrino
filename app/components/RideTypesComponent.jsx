import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ResponseBlock from './ResponseComponent.jsx';
import callApi from '../services/index.jsx';

import Fetch from 'react-fetch'




import GlobalActions from 'actions/global';

export default (path, dataBlob, ctx, cb) => {
  const self = ctx;
  const data = dataBlob;
  const {
    dispatch,
  } = self.props;

  self.setState({
    response: null
  });

  Object.keys(self.state)
  .filter(Boolean)
  .filter(key => self.state[key] !== '')
  .forEach((key) => {
    data[key] = self.state[key];
  });

  dispatch(GlobalActions.setLoading(true));
  $.ajax({
    type: 'POST',
    url: path,
    data,
  }).done((response) => {
    dispatch(GlobalActions.setLoading(false));
    self.setState({
      response,
    });
    if (cb) cb(response);
  }).catch((err) => {
    dispatch(GlobalActions.setLoading(false));
    self.setState({
      response: err
    });
  });
};





class RideTypes extends Component {

  constructor() {
    super();

    this.state = {};
  }

  onInputChange(inputName, event) {
    this.setState({
      [inputName]: event.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault(); //prevents from using the default value

    const {
      location: {
        lat,
        lng
      },
    } = this.props;
    const data = {
      lat,
      lng,
    };

    
    callApi('/api/lyft/ridetypes', data, this);
  }

  render() {
    return (
      <div className="api-module">
        <form
          onSubmit={this.onSubmit.bind(this)}
        >
          <h3 className="api-module__title">
            Ride Types
            <a
              href="https://developer.lyft.com/docs/availability-ride-types"
              target="_blank"
              className="api-module__button"
            >
              API docs
            </a>
          </h3>
          <div className="form-group">
            <label htmlFor="location">Latitude</label>
            <input
              className="form-control"
              placeholder={37.774929}
              disabled
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Longitude</label>
            <input
              className="form-control"
              placeholder={-122.419416}
              disabled
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ride_type">Ride Type (optional)</label>
            <input
              className="form-control"
              type="text"
              placeholder="lyft, lyft_line, or lyft_plus"
              onChange={this.onInputChange.bind(this, 'ride_type')}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
          {this.state.response && <ResponseBlock  content={this.state.response} />
          }
        </form>
      </div>
    );
  }
}

RideTypes.propTypes = {
  location: PropTypes.object,
};

export default RideTypes;
