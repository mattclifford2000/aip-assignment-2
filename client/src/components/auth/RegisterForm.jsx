import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export default class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      score: 0,
      password: "",
      passwordError: "",
      name: "",
      nameError: "",
      dateofbirth: "",
      dateofbirthError: "",
      debts: [],
      requests: [],
      credits: [],
    };

    const [validated, setValidated] = useState(false);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this); //error here
  }

  

  handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      dateofbirth: this.state.dateofbirth,
      score: this.state.score,
      debts: this.state.debts,
      requests: this.state.requests,
      credits: this.state.credits,
    };

    const url = "http://localhost:9000/register";
    axios
      .post(url, { user })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        console.log(user);
      });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="string"
              name="name"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="dateofbirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateofbirth"
              value={this.state.dateofbirth}
              onChange={this.handleInputChange}
              placeholder="Date of Birth"
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
