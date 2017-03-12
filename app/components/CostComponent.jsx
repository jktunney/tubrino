import React, { Component, PropTypes } from 'react';
import callApi from '../services';


class Cost extends Component {

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
    e.preventDefault();
    const {
      location: {
        lat,
        lng,
      },
    } = this.props;
    const data = {
      start_lat: lat,
      start_lng: lng,
    };
    callApi('/api/lyft/cost', data, this);
  }

  render() {
    return (
      <div className="api-module">
        <form
          onSubmit={this.onSubmit.bind(this)}
        >
          <h3 className="api-module__title">
            Cost
            <a
              href="https://developer.lyft.com/docs/cost"
              target="_blank"
              className="api-module__button"
            >
              API docs
            </a>
          </h3>
          <div className="form-group">
            <label htmlFor="location">Start Latitude</label>
            <input
              className="form-control"
              placeholder={this.props.location.lat}
              disabled
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Start Longitude</label>
            <input
              className="form-control"
              placeholder={this.props.location.lng}
              disabled
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ride_type">End Latitude (optional)</label>
            <input
              className="form-control"
              type="text"
              placeholder="the destination latitude"
              onChange={this.onInputChange.bind(this, 'end_lat')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ride_type">End Longitude (optional)</label>
            <input
              className="form-control"
              type="text"
              placeholder="the destination longitude"
              onChange={this.onInputChange.bind(this, 'end_lng')}
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

Cost.propTypes = {
  location: PropTypes.object,
};

export default Cost;