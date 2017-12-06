import React, { Component } from 'react';

const FIVE_MINUTES = 1000 * 60 * 5;
/* const TIME = FIVE_MINUTES;*/

// Real time for display:
const TIME = 30000;

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 0,
      latitude: 0,
      trackID: this.props.trackID
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.getLocation(),
      TIME
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Updates GPS state
  getLocation() {

    console.log("Retrieving location...");
    // Need to specify high accuracy is off
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          longitude: (position.coords.longitude).toFixed(6),
          latitude: (position.coords.latitude).toFixed(6),
          trackID: this.props.trackID
        }, () => {
          this.postLocation();
        });
      },
      error => console.log(error)
    );

  }

  // Send POST request with the data to the server
  postLocation() {
    fetch('/coordinates', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        trackID: this.state.trackID
      })
    })
      .then(function(body) {
        console.log(body);
      });
  }


  render() {
    const coordinates = (
      <div className="text-center">
        <h2>
          My latitude:<br/>{this.state.latitude}
        </h2>
        <h2>
          My longitude:<br/>{this.state.longitude}
        </h2>
      </div>
    );
    return coordinates;
  }
}

export default Location;