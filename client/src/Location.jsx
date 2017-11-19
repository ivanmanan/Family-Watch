import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';

class Location extends Component {
  constructor() {
    super();
    this.state = { coordinates: {} };
  }

  // Send GPS coordinates to server
  // Need to setup timer to trigger this function or make
  // this function into a for-loop -- this must run in parallel
  // with the rest of the web application
  handleLocation(e) {
    // Send POST request with the data to the server
    // Currently broken
    console.log(this.props.coords);
    fetch('/coordinates', {
      method: 'POST',
      data: {
        longitude: this.props.coords.longitude,
        latitude: this.props.coords.latitude
      },
      headers: new Headers()
    })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
      });

    const coordinates = (
      <div>
        <h2>
          My latitude is: {this.props.coords.latitude}
        </h2>
        <h2>
          My longitude is: {this.props.coords.longitude}
        </h2>
      </div>
    );
    return coordinates;
  }
  render() {
    return !this.props.isGeolocationAvailable
         ? <div>Your browser does not support Geolocation</div>
         : !this.props.isGeolocationEnabled
         ? <div>Geolocation is not enabled</div>
         : this.props.coords
         ? this.handleLocation()
         : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);