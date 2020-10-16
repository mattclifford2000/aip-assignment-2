import React, { Component, useState } from "react"; //eslint-disable-line
import { Link, Redirect, History } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";

class Logout extends React.Component {
  state = {
    redirect: false
  }


  /*
    note: Need to fix logout page which automatically keeps refreshing. Refresh page
    is needed so navbar refreshes and updatse when it's redirected. 

    Basically, it works but isn't good design
  */

  setRedirect = () => {
    this.setState({
      redirect: true
    })
    localStorage.setItem('user', null);
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('authToken', null);

  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Button onClick={this.setRedirect}>Logout</Button>
      </div>
    )
  }
}

export default Logout;
