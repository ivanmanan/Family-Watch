import React, { Component } from 'react';

const FIVE_MINUTES = 1000 * 60 * 5;
const TIME = FIVE_MINUTES;

// When checkbox is checked, submit a GET request
// To retrieve GPS history of that user
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      userID: this.props.userID
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

  // I want to set this on a timer to check if
  getHistory() {
    if (this.state.checked) {
      console.log("Retrieving location history...");
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