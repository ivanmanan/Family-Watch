import React, { Component } from 'react';
import Sample from './Sample';
import Maps from './Maps';
import Panel from './Panel';

class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <Sample/> */}
        <Maps/>

        <Panel/>
      </div>
    );
  }
}

export default App;