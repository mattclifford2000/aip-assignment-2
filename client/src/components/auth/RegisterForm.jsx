import React, {Component} from "react";
import { Button, Form, } from "react-bootstrap";


export class RegisterComponent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }
  
  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="string" name="name" placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="formBasicDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" name="dateofbirth" placeholder="date" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check name="checkbox" type="checkbox" label="Check me out" />
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
