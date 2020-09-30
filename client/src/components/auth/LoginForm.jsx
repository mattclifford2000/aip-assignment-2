import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import RegisterComponent from "./RegisterForm";


export default 
  class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
        email: '',
        password: ''
      };

    

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handlEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e) {
      alert('A form was submitted: ' + this.state);
      fetch('http://localhost:9000/login', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    event.preventDefault();
    }
    
    handlEmailChange(e) {
      this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }

    

    render() {

     

      return (
        <div>
          <Form onSubmit={this.handleSubmit} noValidate>
          
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              id="email"
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              id="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
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

