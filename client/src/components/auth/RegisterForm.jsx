import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export default class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      dateofbirth: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDOBChange = this.handleDOBChange.bind(this);
  }

  handleSubmit(e) {
    alert("A form was submitted: " + this.state);
    fetch("http://localhost:9000/register", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    window.event.preventDefault();
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDOBChange(e) {
    this.setState({ name: e.target.value });
  }

  validateForm() {
    return (
      this.email.length > 0 &&
      this.password.length > 0 &&
      this.name.length > 0 &&
      this.dateofbirth.length > 0
    );
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              type="string"
              name="name"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              id="dateofbirth"
              value={this.state.dateofbirth}
              onChange={this.handleDOBChange}
              name="dateofbirth"
              placeholder="date"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
