import React, { Component, useState } from "react"; //eslint-disable-line
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.scss";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const url = "/login";

  function handleSubmit(e) {
    e.preventDefault();
    const login = {
      email: email,
      password: password,
    };

    axios
      .post(url, { login })
      .then((response) => {
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('user', response.data.user);
        localStorage.setItem('userID', response.data.id);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('authToken', response.data.authToken);
        if (response.status === 200) {
          setAuthTokens(response.data);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  //redirect user if user is already logged in
  if (localStorage.getItem("loggedIn") === "true" || localStorage.getItem("loggedIn") === true) {
    return <Redirect to="/" />;
  }


  return (
    <div>
      <div className="loginform" id="login">
        <Card style={{ width: "18rem" }}>
          <Card.Header>Login</Card.Header>
          <Form onSubmit={handleSubmit} noValidate>

            <Form.Group controlId="id">
              <Form.Label><span><FontAwesomeIcon icon="at"></FontAwesomeIcon> Email Address  </span> </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label><span><FontAwesomeIcon icon="key"></FontAwesomeIcon> Password </span> </Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
              />
            </Form.Group>

            <Button variant="primary" type="submit"> Submit </Button>
            <br></br>
            <Link to="/register">Don't have an account?</Link>
          </Form>
          {isError && (<Error>The username or password provided were incorrect!</Error>)}
        </Card>

      </div>
    </div>
  );
}

export default Login;

