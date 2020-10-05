import React, { Component, useState } from "react"; //eslint-disable-line
import { Link } from 'react-router-dom';
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css"

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      //error state for form validation
      errors: {
        email: "",
        password: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //Validates if the inputs for email and password fit
  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password,
    };
    const url = "http://localhost:9000/auth/login";

    axios
      .post(url, { login })
      .then((response) => {
        if (response.status = 200)
        {

        }
        console.log(response);
        console.log(response.data);
        console.log(login);
      })
      .catch((error) => {
        console.error(error);
        console.log(login);
      });
  }

  handleInputChange = (e) => {
    var validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i //eslint-disable-line
    );

    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "You must enter a valid email.";
        break;
      case "password":
        errors.password =
          value.length < 8
            ? "Your password must be 8 characters or longer."
            : "";
        break;
      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors, [name]: value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="loginform">
        <Card style={{ width: '18rem'}}>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group controlId="id">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          {errors.email.length > 0 && (
            <span className="error">{errors.email}</span>
          )}
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          {errors.password.length > 0 && (
            <span className="error">{errors.password}</span>
          )}
          <br></br>
          {errors.password.length === 0 &&
            errors.email.length === 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 && (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
            <Link to="/register">Don't have an account?</Link>
        </Form>
        </Card>
      </div>
    );
  }
}
