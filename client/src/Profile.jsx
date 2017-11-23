import React, { Component } from 'react';
import Location from './Location';

// Display username logged in and
// his or her account status
// e.g. host or participant
class Profile extends Component {



  render() {
    return (
      <div className="Profile text-center">
        <h1>Username</h1>
        <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
        <Location/>
      </div>
    );
  }

}

export default Profile;
