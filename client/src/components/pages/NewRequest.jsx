import React, { Component, useState } from "react"; //eslint-disable-line
import { Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Register.css";

export default class NewRequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      requestname: "",
      requestcontent: "",
      requestcompleted: false,
      errors: {
        requestcontent: "",
        requestcompleted: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleInputChange = this.handleInputChange.bind(this);
  }

  //Validates if the inputs fit
  /* validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };*/

  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();

    /*if (this.validateForm(this.state.errors) === false) {
      e.stopPropagation();
    }*/

    const request = {
      token: localStorage.getItem("authToken"),
      requestname: this.state.requestname,
      requestcontent: this.state.requestcontent,
      requestcompleted: this.state.requestcompleted,
    };

    const url = "http://localhost:9000/newrequest";

    axios
      .post(url, request)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.setState({ result: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    //let errors = this.state.errors;
    //var today = new Date();
    /*switch (name) {
      case "email":
        errors.email =
          validEmailRegex.test(value) || value.length < 6
            ? ""
            : "You must enter a valid email.";
        break;
      case "password":
        errors.password =
          value.length < 8 || value.length > 1024
            ? "Your password must be 8 characters or longer."
            : "";
        break;
      case "name":
        errors.name =
          value.length < 6 || value.length > 36
            ? "Your name must be in between 6 and 36 characters."
            : "";
        break;
      case "dateofbirth":
        errors.dateofbirth =
          new Date(value) >= new Date(today)
            ? "Your date of birth must be valid and before today."
            : "";
        break;
      default:
        break;
    }*/
    this.setState({ [e.target.name]: e.target.value });
    //this.setState({ errors, [name]: value });
  };

  render() {
    //this.setState({ token: localStorage.getItem("authToken") });
    return (
      <div className="registerform">
        <Card style={{ width: "18rem" }}>
          <Form onSubmit={this.handleSubmit} noValidate>
            <Form.Group controlId="token">
              <Form.Control
                type="string"
                name="token"
                value={localStorage.getItem("authToken")}
              />
            </Form.Group>
            <Form.Group controlId="requestcompleted">
              <Form.Control
                type="string"
                name="requestcompleted"
                value={false}
              />
            </Form.Group>
            <Form.Group controlId="requestname">
              <Form.Label>Request Name</Form.Label>
              <Form.Control
                type="string"
                name="requestname"
                placeholder="Enter request name"
                value={this.state.requestname}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="requestcontent">
              <Form.Label>Request Description</Form.Label>
              <Form.Control
                type="string"
                name="requestcontent"
                placeholder="Enter a description of the request"
                value={this.state.requestcontent}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}
