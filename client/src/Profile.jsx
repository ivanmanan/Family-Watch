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
    var self = this;
    console.log("TEST");
    // On submit of the form, send a POST request with the data to the server.
    fetch('/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: self.refs.username,
        password: self.refs.password
      })
    })
    .then(function(res) {
      return res.json()
    })
    .then(function(json) {
      console.log(json);
    });
  }


  render() {
    return (
      <div className="Profile text-center">
        <h1>Login Here</h1>
        <form method="post" action="/users" onSubmit={this.onSubmit}>
          <input type="text" placeholder="Username" ref="username"/>
          <input type="password" placeholder="Password" ref="password"/>
          <br />
          <input type="submit" />
        </form>
        <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
        <Location/>
      </div>
    );
  }

}

export default Profile;
