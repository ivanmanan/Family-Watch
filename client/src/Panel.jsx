import React, { Component } from 'react';
import User from './User';

// todo: install checkboxes next to the users
// These checkboxes do a post request to history to send data to Maps.jsx
class Panel extends Component {

  // Initial empty state to prevent users.map from blowing up
  // before users are loaded
  state = {
    users: []
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  // Need to create a new jsx component for each user Id made
  render() {
    return (
      <div className="Panel text-center">
        <h1>Users</h1>
        <img id="settings-logo" src="/images/settings.png" alt="Settings"/>
        {this.state.users.map(user =>
          <User className="row" key={user.id} username={user.name} userID={user.id} appendHistory={this.props.appendHistory}/>
        )}
      </div>
    );
  }

}

export default Panel;