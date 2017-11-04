import React, { Component } from 'react';
import Sample from './Sample';
import Maps from './Maps';
import Panel from './Panel';
import Profile from './Profile';

class App extends Component {

  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="navbar-header">
	          <h1 className="navbar-brand" id="heading">Police Watch</h1>
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
            <Sample/>
            <Maps/>
          </div>

          <div className="Panel-block
            col-md-3
            col-sm-4
            col-xs-4">
            <Panel/>
          </div>

        </div>
      </div>
    );
  }
}

export default App;