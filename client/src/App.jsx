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
      loggedIn: false
    };
    this.appendHistory = this.appendHistory.bind(this);
  }

  // yb todo:
  // Make this function passed to Profile.jsx
  // See the render function at the bottom of this file
  // and how I did appendHistory function
  login() {
    this.setState({
      loggedIn: true
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
        var temp = this.state.history;

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

  // ivan todo:
  // If login flag is false, then do not display anything
  // This is just a simple conditional
  render() {
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
            <Profile/>
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