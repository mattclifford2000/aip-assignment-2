import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Login, createEmptyLogin } from "../model/Login";
import useState from 'react';

handleChange = (event: any) => {
  event.preventDefault();
  const { name, value } = event.target;
  this.setState({ [name]: value });
  console.log(this.state);
};

handleSubmit = (event: any) => {};

interface SignUpProps {
  name?: any;
  value?: any;
}

interface SignUpState {
  dateofbirth: Date;
  name: string;
  email: string;
  password: string;
  checkbox: HTMLInputElement;
  errors: {
    dateofbirth: Date;
    name: string;
    email: string;
    checkbox: HTMLInputElement;
    password: string;
  };
}

export class RegisterComponent extends React.Component<
  SignUpProps,
  SignUpState
> {
  

 

  constructor(props: SignUpProps) {
    super(props);
    const initialState = {
      name: "",
      email: "",
      password: "",
      dateofbirth: "",
      checkbox: "",
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="string"
              name="name"
              placeholder="Enter name"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateofbirth"
              placeholder="date"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              name="checkbox"
              type="checkbox"
              label="Check me out"
              onChange={this.handleChange}
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

export default RegisterComponent;
