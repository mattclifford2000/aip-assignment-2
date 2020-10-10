import React, { useState } from "react"; //eslint-disable-line
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import "../../styles/Login.css";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState(new Date(0));
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
      dateofbirth: dob,
      role: "user",
      score: 0,
      debits: [],
      credits: [],
      requests: [],
    };

    const url = "http://localhost:9000/auth/register";
    axios
      .post(url, { user })
      .then((response) => {
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

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="registerform">
      <Card style={{ width: "18rem" }}>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
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

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="string"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
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
         
          <Form.Group controlId="dateofbirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateofbirth"
              value={dob}
              onChange={(e) => {
                setDOB(e.target.value);
              }}
              placeholder="Date of Birth"
            />
          </Form.Group>          
              <Button variant="primary" type="submit">
                Submit
              </Button>
          <Link to="/login">Already have an account?</Link>
          {isError && (
          <Error>You have provided one or more invalid details. Please try again.</Error>
        )}
        </Form>
      </Card>
    </div>
  );
}

export default Register;
