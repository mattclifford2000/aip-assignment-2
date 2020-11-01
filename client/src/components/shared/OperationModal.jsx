import React from 'react';
import { Button, Modal, Alert } from "react-bootstrap";

class OperationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: null,
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    this.props.onHandleClose(e);
  }

  statusTitle(status) {
    if (status === 200) return ("Success");
    else return ("Error");
  }

  statusInfo(status) {
    if (status === 200) return ("Action completed successfully. Click close to continue.");
    else return ("Please check inputs and try again.");
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
          <Modal.Body>
            <Alert variant={(status === 200) ? "success" : "danger"}>
              <Alert.Heading>{this.statusInfo(status)}</Alert.Heading>
            </Alert>
          </Modal.Body>
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