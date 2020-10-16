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
      name: "",
      content: "",
      completed: false,
      chocolates: 0,
      muffins: 0,
      errors: {
        name: "",
        content: "",
        completed: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();

    const request = {
      token: localStorage.getItem("authToken"),
      name: this.state.name,
      content: this.state.content,
      completed: this.state.completed,
      chocolates: this.state.chocolates,
      muffins: this.state.muffins
    };

    const url = "http://localhost:9000/request/new";

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
      case "name":
        errors.name =
          value.length < 3 || value.length > 1024
            ? "Your request name must be 3 characters or longer."
            : "";
        break;
      case "content":
        errors.content =
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
            <Form.Group controlId="completed">
              <Form.Control
                type="hidden"
                name="completed"
                value={false}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Request Name</Form.Label>
              <Form.Control
                type="string"
                name="name"
                placeholder="Enter request name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.name} </p>
            </Form.Group>
            <Form.Group controlId="chocolates">
              <Form.Label>Chocolates</Form.Label>
              <Form.Control
                type="number"
                name="chocolates"
                placeholder="How many chocolates?"
                value={this.state.chocolates}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="muffins">
              <Form.Label>Muffins</Form.Label>
              <Form.Control
                type="number"
                name="muffins"
                placeholder="How many muffins?"
                value={this.state.muffins}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Request Description</Form.Label>
              <Form.Control
                type="string"
                name="content"
                placeholder="Enter a description of the request"
                value={this.state.content}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.content} </p>
            </Form.Group>
            {this.state.name.length >= 3 &&
              this.state.content.length >= 3 && (
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
