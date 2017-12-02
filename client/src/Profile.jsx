import React, { Component } from 'react';
import Location from './Location';

// Display username logged in and
// his or her account status
// e.g. host or participant
class Profile extends Component {

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch('/users', {
        method: 'GET',
        body: JSON.stringify({
          username: self.refs.username,
          password: self.refs.password
        }),
        data: {
          name: self.refs.username,
          password: self.refs.password
        }
      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
      });
  }


  render() {
    return (
      <div className="Profile text-center">
        <h1>Login Here</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Username" ref="username"/>
          <input type="text" placeholder="Password" ref="password"/>
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
