import React, { Component, useState } from "react"; //eslint-disable-line
import { Link, Redirect, History, useHistory } from "react-router-dom";
import { Button, Form, Card, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css";
import "../../styles/Logout.css";
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
    localStorage.setItem('tokens', null);
    localStorage.setItem('user', null);
    localStorage.setItem('username', null);

  }


  if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === false) {
    return <Redirect to="/login" />;
  }


  return (
    <div>
      <h1> Are you sure you want to logout? </h1>

      <Button variant="success" size="lg" href="/" onClick={handleLogout} id="button"> Yes </Button>
      <Button variant="danger" size="lg" href="/" id="button" > No </Button>
    </div>
  )
}


export default Logout;
