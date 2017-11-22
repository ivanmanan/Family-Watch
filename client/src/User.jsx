import React, { Component } from 'react';

const FIVE_MINUTES = 1000 * 60 * 5;
const TIME = 6000;

// When checkbox is checked, submit a GET request
// To retrieve GPS history of that user
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      userID: this.props.userID,
      history: []
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.getHistory(),
      TIME
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      checked: value
    });
  }

  // Retrieve GPS history of that
  // this will not work until I can send user_id to the history
  getHistory() {
    if (this.state.checked) {

      fetch('/history', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          user_id: this.state.userID,
        })
      })
        .then(res => res.json())
        .then(history => this.setState({ history }));

      // This is the variable I want to export to Map that
      // will always be updated -- need to change timer to five minutes
      console.log(this.state.history);

      // Check if undefined history first
      /* if (typeof this.state.history[0] !== 'undefined') {
       *   console.log(this.state.history[0].time);
       *   console.log(this.state.history[0].longitude);
       * }*/
    }
  }


  render() {
    return (
      <div className="row">
        <div className="col-sm-1 col-sm-offset-3">
          <input type="checkbox" id="user-checkbox" checked={this.state.checked}
                 onChange={this.handleCheckboxChange}/>
        </div>

        <div className="text-left col-sm-5">
          <h2>{this.props.username}</h2>
        </div>

      </div>
    );
  }
}

export default History;