import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

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
    this.handleInputChange = this.handleInputChange.bind(this); //error here
    
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, name, dateofbirth } = this.state;
    const user = { email, password, name, dateofbirth };

    axios
      .post("http://localhost:9000/register", user)
      .then(() => console.log("User Created"))
      .catch((err) => {
        console.error(err);
      });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              id="dateofbirth"
              value={this.state.dateofbirth}
              onChange={this.handleInputChange}
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
