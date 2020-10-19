import React, { Component, useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from "react-bootstrap";

class OperationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: null,
        }
        this.handleClose = this.handleClose.bind(this);

      }
     // const [show, setShow] = useState(true);
     handleClose(e) {
        this.props.onHandleClose(e);
      }
      
      statusTitle(status) {
          if(status === 200) return("Success");
          else return ("Error");
      }

        statusInfo(status) {
        if(status === 200) return("Action completed successfully.");
        else return ("Please try again. Error: " + status);
        }


    render() {
      const status = this.props.status;
      const show = this.props.show;
      return (
          <div>
        <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
      <Modal.Title>{this.statusTitle(status)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.statusInfo(status)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>)
    }
  }

  export default OperationModal;