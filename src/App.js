import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import { Button } from 'react-bootstrap'
import EditModal from './EditModal';

class App extends Component {
  constructor() {
    super();

    this.state = {
      times: {},
      showModal: false,
      selectedMetadata: {}
    };

    this.selectedTime = null;

    this.displayModal = this.displayModal.bind(this);
    this.editAppt = this.editAppt.bind(this);
  }

  componentDidMount() {
    this.setState({times: this.createTimesObject()});

    // fetch('/ping')
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(response) {
    //   console.log('here', response);
    // });
  }

  createTimesObject() {
    var times = {};
    var startTime = moment("9:00", "H:mm");
    const endTime = moment("17:00", "H:mm");

    while(startTime <= endTime){
        times[new moment(startTime).format('h:mm')] = {
            status: 'available',
            name: '',
            phone: ''
        };

        startTime.add(1, 'h');
    }

    return times;
  }

  displayModal(showModal, time) {
      const selectedMetadata = this.state.times[time];
     
      this.setState({
        showModal: showModal,
        selectedMetadata: selectedMetadata
      });

      this.selectedTime = time;
  }

  editAppt(time, newStatus, fields) {
    const newTimes = {...this.state.times};
    newTimes[time].status = newStatus;
    newTimes[time].name = fields.name;
    newTimes[time].phone = fields.phone;

    this.setState({
      showModal: false,
      times: newTimes
    });
  }

  test() {
    // console.log(this.state.times);
  }

  render() {
    const listItems = [];
    const times = this.state.times;
    
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
          editAppt={this.editAppt}
          selectedTime={this.selectedTime}
          selectedMetadata={this.state.selectedMetadata}
        />
        
        <button type="button" onClick={this.test.bind(this)}></button>

        <header className="App-header">
          <h1 className="App-title">Scheduling App</h1>
        </header>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default App;
