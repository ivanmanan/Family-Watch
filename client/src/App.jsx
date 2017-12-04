import React, { Component } from 'react';

import Maps from './Maps';
import Panel from './Panel';
import Profile from './Profile';

// Global variable
var userCount = 0;

class App extends Component {

  // Constructor to pass down History prop between Maps.jsx and Panel.jsx
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      loggedIn: sessionStorage.getItem('loggedIn'),
      loginTried: false,
      user_id: sessionStorage.getItem('user_id')
    };
    this.appendHistory = this.appendHistory.bind(this);
    this.login = this.login.bind(this);
    this.loginFailed = this.loginFailed.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({
      loggedIn: true
    });

    sessionStorage.setItem('loggedIn', true);
  }

  logout() {
    this.setState({
      loggedIn: false
    });

    this.setState({
      loginTried: false
    });

    sessionStorage.setItem('loggedIn', false);
    sessionStorage.setItem('user_id', null);
  }

  loginFailed() {
    this.setState({
      loginTried: true
    });
  }

  // Append existing history with newest addition
  // Callback function App.jsx --> Panel.jsx --> User.jsx
  appendHistory(addition, userFlag) {

    // If function has been run four times consecutively,
    // then clear history
    if (userCount % 4 === 0) {
      this.setState({
        history: []
      });
    }

    userCount++;

    // Check userFlag -- if it's false, then user checkbox was not checked
    if (userFlag) {
      const user_ID = addition[0].id;
      var temp = [];

      // Check if this.state.history is undefined
      if (typeof this.state.history[0] === 'undefined')
        console.log("Initializing history.");
      else
        temp = this.state.history;

      for (var i = 0; i < addition.length; i++) {
        temp.push({
          id: user_ID,
          time: addition[0].time,
          longitude: addition[0].longitude,
          latitude: addition[0].latitude
        })
      }

      this.setState({
        history: temp
      });

      // Changed history state -- send this to Maps.jsx
      //console.log(this.state.history);

      /* console.log("Working on appending history.");
       * console.log("User ID: " + addition[0].id);
       * console.log(addition[0].time);
       * console.log(addition[0].longitude);
       * console.log(addition);*/

      // todo: sort the array by time at Maps.jsx file
    }
  }

  render() {
    console.log("User ID:");
    console.log(this.state.user_id);

    if (!this.state.loggedIn)
      return (
        <div className="App">

          <nav className="navbar navbar-inverse navbar-static-top">
            <div className="navbar-header">
	            <h1 className="navbar-brand" id="heading">Family Watch</h1>
	          </div>
          </nav>

          <div className="row">

            <div className="Profile-block
              col-md-2
              col-sm-2
              col-xs-2">
              <Profile login={this.login} loggedIn={this.state.loggedIn} loginFailed={this.loginFailed} loginTried={this.state.loginTried} logout={this.logout}/>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="App">

          <nav className="navbar navbar-inverse navbar-static-top">
            <div className="navbar-header">
	            <h1 className="navbar-brand" id="heading">Family Watch</h1>
	          </div>
          </nav>

          <div className="row">

            <div className="Profile-block
              col-md-2
              col-sm-2
              col-xs-2">
              <Profile login={this.login} loggedIn={this.state.loggedIn} loginFailed={this.loginFailed} loginTried={this.state.loginTried} logout={this.logout} trackID={this.state.user_id}/>
            </div>
            <div className="Maps-block
              col-md-7
              col-sm-6
              col-xs-6">
              <Maps history={this.state.history}/>
            </div>

            <div className="Panel-block
              col-md-3
              col-sm-4
              col-xs-4">
              <Panel appendHistory={this.appendHistory}/>
            </div>

          </div>
        </div>
      );
  }
}

export default App;
