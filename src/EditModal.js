import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editData } from "./actions/index";

class EditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: ''
        };
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.times !== null && nextProps.selectedTime !== null) {
            const time = nextProps.times[nextProps.selectedTime];

            return {
                name: time.name,
                phone: time.phone
            };
        }

        return null;
    }

    editData() {
        console.log(this.props.selectedTime);
        this.props.editData(this.props.selectedTime, this.state);
        this.props.displayModal(false, null);
    }

    render() {
        const available = this.props.times !== null && this.props.selectedTime !== null && this.props.times[this.props.selectedTime].status === 'available';
        const title = available ? 'Make' : 'Edit';
        const save = available ? 'Schedule' : 'Update';

        return (
            <Modal show={this.props.showModal} onHide={() => this.props.displayModal(false, null)} dialogClassName="edit-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{title} An Appointment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input type="text" name="name" required placeholder="Your name" className="textBoxes" onChange={this.handleChange.bind(this)} value={this.state.name}/>
                    <input type="text" name="phone" required placeholder="Your phone number" className="textBoxes" onChange={this.handleChange.bind(this)} value={this.state.phone}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.editData.bind(this)}>{save} Appointment</Button>
                </Modal.Footer>
          </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {times: state.times};
}

// export default EditModal;
export default connect(mapStateToProps, {editData})(EditModal);