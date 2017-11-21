import React, { Component } from 'react';

// todo: install checkboxes next to the users
class Panel extends Component {


  // Initial empty state to prevent users.map from blowing up
  // before users are loaded
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="Panel text-center">
        <h1>Settings</h1>
        <img id="settings-logo" src="/images/settings.png" alt="Settings"/>
        <h2>Users</h2>
        {this.state.users.map(user =>
          <div key={user.id}>{user.name}</div>
        )}
      </div>
    );
  }

}

export default Panel;