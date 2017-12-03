import React, { Component } from 'react';
import Location from './Location';
import App from './App';

// User login form
// If user logs in successfully,
// username will be displayed instead of login form
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { username: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/login')
      .then((res) => res.json())
      .then((userinfo) => console.log(userinfo));
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("Getting login information...");
    console.log(this.refs.username.value);
    console.log(this.refs.password.value);
    console.log("Login information obtained.");

    // On submit of the form, send a POST request with the data to the server.
    fetch('/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.refs.username.value,
        password: this.refs.password.value
      })
    })
    .then(function(body) {
      console.log(body);
    });

    console.log("TEST!");
    this.props.login();

    // yb todo:
    // If login was successful, then call the login() function in App.jsx here
    // See how I did appendHistory
  }

  // yb todo:
  // Replace form after successful login with another component of the username
  // This will be replaced after login flag is sent to parent component
  // Make an if-else React component
  // https://reactjs.org/docs/conditional-rendering.html
  // You may want to make login as a state here
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
