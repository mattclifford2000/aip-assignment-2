import React, { Component, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Requests from "./components/pages/Requests"
import Profile from "./components/pages/Profile"
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";

import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthContext } from "./components/context/auth";
import Leaderboard from "./components/shared/Leaderboard";

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Favour Centre</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home Page</Nav.Link>
                <Nav.Link href="/requests">Requests</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/requests" component={Requests} />
          <Route exact path="/profile" component={Profile} />

        </div>
      </Router>
    );
  }
}
