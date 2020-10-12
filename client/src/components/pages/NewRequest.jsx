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
        requestname: "",
        requestcontent: "",
        requestcompleted: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();

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
    let errors = this.state.errors;
    switch (name) {
      case "requestname":
        errors.requestname =
          value.length < 3 || value.length > 1024
            ? "Your request name must be 3 characters or longer."
            : "";
        break;
      case "requestcontent":
        errors.requestcontent =
          value.length < 3 || value.length > 1024
            ? "Your request description must be 3 characters or longer."
            : "";
        break;
      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="registerform">
        {/*Reuse RegisterForm styling for now*/}
        <Card style={{ width: "18rem" }}>
          <Form onSubmit={this.handleSubmit} noValidate>
            <Form.Group controlId="token">
              <Form.Control
                type="hidden"
                name="token"
                value={localStorage.getItem("authToken")}
              />
            </Form.Group>
            <Form.Group controlId="requestcompleted">
              <Form.Control
                type="hidden"
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
              <p> {this.state.errors.requestname} </p>
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
              <p> {this.state.errors.requestcontent} </p>
            </Form.Group>
            {this.state.requestname.length >= 3 &&
              this.state.requestcontent.length >= 3 && (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
          </Form>
        </Card>
      </div>
    );
  }
}
