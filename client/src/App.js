<<<<<<< HEAD
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Requests from "./components/pages/Requests";
import Profile from "./components/pages/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthContext } from "./components/context/auth";
import { Navbar, Nav } from "react-bootstrap";

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="App">
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
          <PrivateRoute exact path="/requests" component={Requests} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
=======
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Register from "./components/pages/Register";
import Requests from "./components/pages/Requests";
import Profile from "./components/pages/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthContext } from "./components/context/auth";
import { Navbar, Nav } from "react-bootstrap";

import { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';


class DebugRouter extends BrowserRouter {
  constructor(props) {
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null, 2))
    this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
    });
  }
}

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <DebugRouter>
        <div className="App">
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
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/requests" component={Requests} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </div>
      </DebugRouter>
    </AuthContext.Provider>
  );
}

export default App;
>>>>>>> 25c778ce2d7b7fce4b611052862e3473438dbd3b
