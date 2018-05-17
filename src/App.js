import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap'
import EditModal from './EditModal';
import { connect } from 'react-redux';
import { fetchTimes } from './actions/index';

class App extends Component {
  constructor() {
    super();

    this.state = {
        showModal: false
    };

    this.selectedTime = null;
    this.displayModal = this.displayModal.bind(this);
  }

  componentDidMount() {
      this.props.fetchTimes();
  }

  displayModal(showModal, time) {
    this.setState({
        showModal: showModal
    });

    this.selectedTime = time;
  }

  render() {
    const listItems = [];
    const times = this.props.times;

    for (var time in times) {
      let key = time;
      const btnColor = times[key].status === 'available' ? 'success' : 'danger';

      listItems.push(
      <li key={key} className="spacing">
        <Button onClick={() => this.displayModal(true, key)} bsStyle={btnColor} className="timeBtns">{key}</Button>
      </li>
      );
    }
    
    return (
      <div className="App">
        <EditModal
          showModal={this.state.showModal}
          displayModal={this.displayModal}
          selectedTime={this.selectedTime}
        />

        <div className="App-header">
          <span className="App-title">Scheduling App</span>
        </div>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {times: state.times};
}

export default connect(mapStateToProps, {fetchTimes})(App);
