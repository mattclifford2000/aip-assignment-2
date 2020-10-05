import React, { Component } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";

export default class UnauthenticatedHeader extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: null,
    };
  }

  handleClose() {
    this.setState({ show: null });
  }

  handleShow(id) {
    this.setState({ show: id });
  }
  /*
  showButtons() {
    
      return (
        
      );
    }
  */

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Favour Centre</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#requests">Requests</Nav.Link>
              <div>
                <Button
                  variant="primary"
                  onClick={() => this.handleShow("login")}
                >
                  Login
                </Button>
                <Modal
                  show={this.state.show === "login"}
                  onHide={this.handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <LoginForm />
                  </Modal.Body>
                </Modal>
                <Button
                  variant="primary"
                  onClick={() => this.handleShow("register")}
                >
                  Register
                </Button>
                <Modal
                  show={this.state.show === "register"}
                  onHide={this.handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RegisterForm />
                  </Modal.Body>
                </Modal>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
