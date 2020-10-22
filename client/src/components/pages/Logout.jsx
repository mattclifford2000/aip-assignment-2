import React, { Component, useState } from "react"; //eslint-disable-line
import { Link, Redirect, History, useHistory } from "react-router-dom";
import { Button, Form, Card, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";

function Logout(props) {
  const history = useHistory();


  /*  note: still need to fix logout page. Logout button is currently a link styled as a button. */




  function handleLogout(e) {
    localStorage.setItem('userID', null);
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('authToken', null);
  }

  function redirect() {
    history.push("/");
  }

  return (
    <div>
      <h1> Are you sure you want to logout? </h1>
      <Button>
        <a href="/" onClick={handleLogout}> Yes </a>
      </Button>

      <Button variant="danger">
        <a href="/requests" > No </a>
      </Button>
    </div>
  )
}


export default Logout;
