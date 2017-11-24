import React, { Component } from 'react';

import Maps from './Maps';
import Panel from './Panel';
import Profile from './Profile';

class App extends Component {

  // Constructor to pass down History prop between Maps.jsx and Panel.jsx
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }

  // Append existing history with newest addition
  // Callback function App.jsx --> Panel.jsx --> User.jsx
  appendHistory(userID, addition) {
    console.log("Working on appending");
    console.log("User ID: " + userID);
    console.log(addition[0].time);
    console.log(addition[0].longitude);
    console.log(addition);
  }
  // We want to pass down the state history prop to Maps.jsx
  // In order to retrieve all GPS coordinates

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