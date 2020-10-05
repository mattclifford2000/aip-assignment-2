import * as React from "react";
import { Component, useState } from "react"; //eslint-disable-line
import Leaderboard from "../shared/Leaderboard";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import AuthenticatedHeader from "../shared/AuthenticatedHeader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default class FrontPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: null,
    };
  }

  render() {
    return (
      <div>
        <AuthenticatedHeader />
        <p>
          Welcome to the Favour Centre! Enjoy our services!
        </p>
        <Leaderboard />
      </div>
    );
  }
}
