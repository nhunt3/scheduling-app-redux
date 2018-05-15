import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'

class EditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: ''
        }
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedMetadata !== undefined) {
            return {
                name: nextProps.selectedMetadata.name, 
                phone: nextProps.selectedMetadata.phone
            };
        }

        return null;
    }

    render() {
        const title = this.props.selectedMetadata !== undefined && this.props.selectedMetadata.status === 'available' ? 'Make' : 'Edit';
        const save =  this.props.selectedMetadata !== undefined && this.props.selectedMetadata.status === 'available' ? 'Schedule' : 'Update';

        return (
            <Modal show={this.props.showModal} onHide={() => this.props.displayModal(false, null)} dialogClassName="edit-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{title} An Appointment</Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    <input type="text" name="name" required placeholder="Your name" className="textBoxes" onChange={this.handleChange.bind(this)} value={this.state.name} />
                    <input type="text" name="phone" required placeholder="Your phone number" className="textBoxes" onChange={this.handleChange.bind(this)} value={this.state.phone} />
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => this.props.editAppt(this.props.selectedTime, 'booked', this.state)}>{save} Appointment</Button>
                </Modal.Footer>
          </Modal>
        );
    }
}

export default EditModal;