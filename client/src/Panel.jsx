import React, { Component } from 'react';
import Location from './Location';

class Panel extends Component {



  render() {
    return (
      <div className="Panel text-center">
        <h1>Settings</h1>
        <img id="settings-logo" src="/images/settings.png" alt="Settings"/>
        <Location/>
      </div>
    );
  }

}

export default Panel;