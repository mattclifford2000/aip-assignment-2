import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Login, createEmptyLogin } from "../model/Login";
import Modal from "react-bootstrap/Modal";
import RegisterComponent from "./RegisterComponent";

class LoginComponent extends React.Component {
  handleSubmit = (event: any) => {};
  handleChange = (event: any) => {};

  public render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Check me out"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" className="leftbutton" type="submit">
            Submit
          </Button>
          <Button variant="primary" className="rightbutton">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginComponent;
