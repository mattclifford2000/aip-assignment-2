import React, { Component, useState } from "react"; //eslint-disable-line
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Register.css";

export default class NewFavourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      externalemail: "",
      owed: false,
      favourname: "",
      favourcontent: "",
      favourcompleted: false,
      errors: {
        favourname: "",
        favourcontent: "",
        favourcompleted: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();

    const favour = {
      token: localStorage.getItem("authToken"),
      externalemail: this.state.externalemail,
      owed: this.state.owed,
      favourname: this.state.favourname,
      favourcontent: this.state.favourcontent,
      favourcompleted: this.state.favourcompleted,
    };

    const url = "http://localhost:9000/newfavour";

    axios
      .post(url, favour)
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
    console.log(e);

    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "favourname":
        errors.favourname =
          value.length < 3 || value.length > 1024
            ? "Your favour name must be 3 characters or longer."
            : "";
        break;
      case "favourcontent":
        errors.favourcontent =
          value.length < 3 || value.length > 1024
            ? "Your favour description must be 3 characters or longer."
            : "";
        break;
        case "owebutton":
        this.setState({owed : false});
        break;
        case "owedbutton":
        this.setState({owed : true});
        break;
      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  externalUserLabel() {
    console.log("invoked!")
    return(this.state.owed ? "Email of user who owes you" : "Email of user you owe");
  } 

  render() {
    return (
      <div className="registerform">
        {/*Reuse RegisterForm styling for now*/}
        <Card style={{ width: "18rem" }}>
          <Form onSubmit={this.handleSubmit} noValidate>
            <ButtonGroup aria-label="Favour Choice">
              <Button 
              name="owebutton"
              variant="primary"
              onClick={this.handleInputChange}
              >I owe</Button>
              <Button 
              name="owedbutton"
              variant="primary"
              onClick={this.handleInputChange}
              >I am owed</Button>            </ButtonGroup>
            <Form.Group controlId="token">
              <Form.Control
                type="hidden"
                name="token"
                value={localStorage.getItem("authToken")}
              />
            </Form.Group>
            <Form.Group controlId="favourcompleted">
              <Form.Control
                type="hidden"
                name="favourcompleted"
                value={false}
              />
            </Form.Group>
            <Form.Group controlId="token">
    <Form.Label>{this.externalUserLabel()}</Form.Label>
              <Form.Control
                type="email"
                name="externalemail"
                placeholder="Enter email"
                value={this.state.externalemail}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="favourname">
              <Form.Label>Favour Name</Form.Label>
              <Form.Control
                type="string"
                name="favourname"
                placeholder="Enter favour name"
                value={this.state.favourname}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.favourname} </p>
            </Form.Group>
            <Form.Group controlId="favourcontent">
              <Form.Label>Favour Description</Form.Label>
              <Form.Control
                type="string"
                name="favourcontent"
                placeholder="Enter a description of the favour"
                value={this.state.favourcontent}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.favourcontent} </p>
            </Form.Group>
            {this.state.favourname.length >= 3 &&
              this.state.favourcontent.length >= 3 && (
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
