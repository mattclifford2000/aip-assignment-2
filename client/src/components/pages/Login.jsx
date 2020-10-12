
import React, { Component, useState } from "react"; //eslint-disable-line
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const login = {
      email: email,
      password: password,
    };
    const url = "http://localhost:9000/login";

    axios
      .post(url, { login })
      .then((response) => {
        localStorage.setItem('user', response.data.name);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('authToken', response.data.token);
        setLoggedIn(true);
        if (response.status === 200) {
          setAuthTokens(response.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (localStorage.getItem('loggedIn') === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginform">
      <Card style={{ width: "18rem" }}>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="id">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link to="/register">Don't have an account?</Link>
        </Form>
        {isError && (
          <Error>The username or password provided were incorrect!</Error>
        )}
      </Card>
    </div>
  );
}

export default Login;

