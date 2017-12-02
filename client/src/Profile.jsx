import React, { Component } from 'react';
import Location from './Location';

// Display username logged in and
// his or her account status
// e.g. host or participant
class Profile extends Component {

constructor() {
  super();
  this.state = { username: {} };
  this.onSubmit = this.handleSubmit.bind(this);
}

  handleSubmit(e) {
    e.preventDefault();
    console.log("Getting login information...");
    console.log(this.refs.username);
    console.log("Login information obtained.");

    // On submit of the form, send a POST request with the data to the server.
    fetch('/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.refs.username,
        password: this.refs.password
      })
    })
    .then(function(body) {
      console.log(body);
    });
  }


  // Replace form after login with another component of username
  // This will be replaced after token is sent to parent component
  render() {
    return (
      <div className="Profile text-center">
        <h1>Login Here</h1>
        <form method="post" onSubmit={this.onSubmit}>
          <input type="text" placeholder="Username" ref="username"/>
          <input type="password" placeholder="Password" ref="password"/>
          <br/>
          <input type="submit" />
        </form>
        <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
        <Location/>
      </div>
    );
  }

}

export default Profile;
