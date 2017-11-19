import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';

class Location extends Component {

  // Send GPS coordinates to server
  handleLocation() {

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