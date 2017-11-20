import React, { Component } from 'react';

//const ONE_HOUR = 1000 * 60 * 60;
const TIME = 6000;

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 0,
      latitude: 0
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
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
      },
      error => console.log(error)
    );
    this.postLocation();
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
        latitude: this.state.latitude
      })
    })
      .then(function(body) {
        console.log(body);
      });
  }


  render() {
    const coordinates = (
      <div>
        <h2>
          My latitude is: {this.state.latitude}
        </h2>
        <h2>
          My longitude is: {this.state.longitude}
        </h2>
      </div>
    );
    return coordinates;
  }
}

export default Location;