import React, { Component, useState } from "react"; //eslint-disable-line
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";

function Logout(props) {


  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('user', 'NULL');
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('authToken', 'NULL');
        
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
