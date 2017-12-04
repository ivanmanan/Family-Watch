import React, { Component } from 'react';
import Location from './Location';

// User login form
// If user logs in successfully,
// username will be displayed instead of login form
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('username'),
      userLogin: [],
      trackID: null
    };
    this.onSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    //  if log out button was clicked
    if(this.refs.username.value === "logout" && this.refs.password.value === "logout") {
      this.props.logout();
      this.setState({username: ''});
      sessionStorage.setItem('username', '');
    }
    //  if log in button was clicked
    else {
      console.log("Getting login information...");
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
        .then(res => res.json())
        .then(userinfo => this.setState({ userLogin: userinfo }, () => {

          // Must be done as a callback function for immediate state mutations
          console.log("Reading data sent from server...");

          //  if login was successful
          if(this.state.userLogin[0]) {
            console.log("Login Success!");
            this.setState({
              username: this.state.userLogin[0].username,
              trackID: this.state.userLogin[0].user_id
            });
            sessionStorage.setItem('username', this.state.userLogin[0].username);
            sessionStorage.setItem('user_id', this.state.userLogin[0].user_id);
            this.props.login();
          }
          //  if login failed
          else {
            this.props.loginFailed();
          }
        }));
    }
  }

  reset() {
    // Default setting is clear form
    console.log("Clearing login form.");
  }

  render() {

    //  user is logged in
    if(this.props.loggedIn === "true" || this.props.loggedIn === true) {
      return (
        <div className="Profile text-center">
          <h1>Welcome</h1>
          <h1 id="test" dangerouslySetInnerHTML={{__html: sessionStorage.getItem('username')}}></h1>
          <form method="post" onSubmit={this.onSubmit}>
            <input type="text" ref="username" value="logout" hidden/>
            <input type="password" ref="password" value="logout" hidden/>
            <input type="submit" value="Log Out" />
          </form>
          <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
          <Location trackID={this.state.trackID}/>
        </div>
      );
    }
    //  user failed to log in
    else if(this.props.loginTried) {
      var pStyle = {
        color: 'red'
      };

      return (
        <div className="Profile text-center">
          <h1>Login</h1>
          <form method="post" onSubmit={this.onSubmit}>
            <input type="text" id="input" placeholder="Username" ref="username"/>
            <input type="password" placeholder="Password" ref="password"/>
            <p style={pStyle}>Wrong username or password!</p>
            <button onClick={this.reset}>Log In</button>
          </form>
          <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
          <Location trackID={this.state.trackID}/>
        </div>
      );
    }
    //  user hasn't tried to log in
    else {
      return (
        <div className="Profile text-center">
          <h1>Login</h1>
          <form method="post" onSubmit={this.onSubmit}>
            <input type="text" id="input" placeholder="Username" ref="username"/>
            <input type="password" placeholder="Password" ref="password"/>
            <br/><br/>
            <button onClick={this.reset}>Log In</button>
          </form>
          <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
          <Location trackID={this.state.trackID}/>
        </div>
      );
    }

  }
}

export default Profile;
