import React, { Component } from 'react';

// This is a sample of how to retrieve back-end to front-end
class Sample extends Component {

  // Initial empty state to prevent users.map from blowing up
  // before users are loaded
  state = {users: []}

  componentDidMount() {
    fetch('/backend')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="Sample">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.name}</div>
        )}
      </div>
    );
  }
}

export default Sample;