import React, { Component, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import UnauthenticatedFrontPage from "./components/pages/UnauthenticatedFrontPage";
import AuthenticatedFrontPage from "./components/pages/AuthenticatedFrontPage";

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isAuthenticated: false,
      user: null,
    };


  }
/*
  ShowFrontPage() {
    if (this.state.isAuthenticated === false) {
      return (
        <div>
          <UnauthenticatedFrontPage />
        </div>
      );
    } else {
      return (
        <div>
          <AuthenticatedFrontPage />
        </div>
      );
    }
  }
  */

  render() {
    return (
      <Router>
        <div className="App">
          <UnauthenticatedFrontPage />
        </div>
      </Router>
    );
  }
}
