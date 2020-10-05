import * as React from "react";
import { Component, useState } from "react"; //eslint-disable-line
import Leaderboard from "../shared/Leaderboard";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import UnauthenticatedHeader from "../shared/UnauthenticatedHeader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default class UnauthenticatedFrontPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: null,
    };
  }

  handleClose() {
    this.setState({ show: null });
  }

  handleShow(id) {
    this.setState({ show: id });
  }

  render() {
    return (
      <div>
        <UnauthenticatedHeader />
        <p>
          Welcome to the Favour Centre! Please login or register to make use of
          our fine services!
        </p>
        <br></br>
        <Leaderboard />
      </div>
    );
  }
}
