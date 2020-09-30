import * as React from "react";
import { Component, useState } from "react";
import Leaderboard from "../shared/Leaderboard";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import Header from "../shared/Header";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";



export default class FrontPage extends Component {


  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: null,
      apiResponse: ""
    };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
  this.callAPI();
}

  handleClose() {
    this.setState({show: null});
  }

  handleShow(id) {
    this.setState({show: id});
  }

render() 
{
  return (
    <div>
      <Header />
      <h1>Favour Centre</h1>
      <p>
        Welcome to the Favour Centre! Please login or register to make use of
        our fine services!
      </p>
      <Button variant="primary" onClick={() => this.handleShow('login')}>
        Login
      </Button>
      <Modal 
      show={this.state.show == 'login'} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
      <Button variant="primary" onClick={() => this.handleShow('register')}>
        Register
      </Button>
      <Modal 
      show={this.state.show == 'register'} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
      </Modal>
      <br></br>
      <br></br>
      <Leaderboard />
      <p className="App-intro">{this.state.apiResponse}</p>
    </div>
  );
}
}


