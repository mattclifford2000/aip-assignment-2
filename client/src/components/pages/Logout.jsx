import React, { Component, useState } from "react"; //eslint-disable-line
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";

function Logout(props) {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('user', null);
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('authToken', null);
  }

  function redirect() {
    history.push("/");
  }


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">
          Logout
        </Button>
      </Form>
    </div>
  );
}

export default Logout;
