import React, { Component } from 'react';
import Location from './Location';

// User login form
// If user logs in successfully,
// username will be displayed instead of login form
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { username: sessionStorage.getItem('username'), userLogin: [] };
    this.onSubmit = this.handleSubmit.bind(this);
    console.log(this.props.loggedIn);
  }

  handleSubmit(e) {
    e.preventDefault();

    //  for log out button
    if(this.refs.username.value === "logout" && this.refs.password.value === "logout") {
      this.props.logout();
      this.setState({username: ''});
      sessionStorage.setItem('username', '');
      sessionStorage.setItem('loggedIn', false);
    }
    //  for log in button
    else {
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
        .then(res => res.json())
        .then(userinfo => this.setState({ userLogin: userinfo }, () => {

          // Must be done as a callback function for immediate state mutations
          console.log("Reading data sent from server...");

          console.log(this.props.loggedIn);
          console.log(this.props.loginTried);

          // yb todo:
          // If login was successful, then call the login() function in App.jsx here
          // See how I did appendHistory
          if(this.state.userLogin[0]) {
            console.log("Login Success!");
            this.props.login();
            console.log(this.state.userLogin[0].username);
            this.setState({username: this.state.userLogin[0].username});
            console.log(this.state.username);
            sessionStorage.setItem('username', this.state.userLogin[0].username);
          }
          else {
            console.log("Login fail!");
            this.props.loginFailed();
          }
        }));
    }
  }


  // yb todo:
  // Replace form after successful login with another component of the username
  // This will be replaced after login flag is sent to parent component
  // Make an if-else React component
  // https://reactjs.org/docs/conditional-rendering.html
  // You may want to make login as a state here
  render() {
    //  user is logged in
    if(this.props.loggedIn) {
      console.log(this.state.username);
      console.log(this.props.local);
      console.log(sessionStorage.getItem('username'));
      return (
        <div className="Profile text-center">
          <h1>Welcome</h1>
          <h1 id="test" dangerouslySetInnerHTML={{__html: sessionStorage.getItem('username')}}></h1>
          <form method="post" onSubmit={this.onSubmit}>
            <input type="text" ref="username" value="logout" hidden/>
            <input type="password" ref="password" value="logout" hidden/>
            <input type="submit" value="Log Out"/>
          </form>
          <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
          <Location/>
        </div>
      );
    }
    //  user failed to log in
    else if(this.props.loginTried) {
      var pStyle = {
        color: 'red'
      };
      console.log(this.props.loginTried);
      console.log(this.props.local);
      return (
        <div className="Profile text-center">
          <h1>Login Here</h1>
          <form method="post" onSubmit={this.onSubmit}>
            <input type="text" placeholder="Username" ref="username"/>
            <input type="password" placeholder="Password" ref="password"/>
            <p style={pStyle}>Wrong username or password!</p>
            <input type="submit" value="Log In"/>
          </form>
          <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
          <Location/>
        </div>
      );
    }
    //  user hasn't tried to log in
    else {
      console.log(this.props.loginTried);
      return (
        <div className="Profile text-center">
          <h1>Login Here</h1>
          <form method="post" onSubmit={this.onSubmit}>
            <input type="text" placeholder="Username" ref="username"/>
            <input type="password" placeholder="Password" ref="password"/>
            <br/><br/>
            <input type="submit" value="Log In"/>
          </form>
          <img id="eye-logo" src="/images/sauron.png" alt="Police-Watch"/>
          <Location/>
        </div>
      );
    }

  }
}

export default Profile;
