import axios from "axios";
import React, { useState } from "react"; //eslint-disable-line
import { Button, Card, Form } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../../styles/Login.scss";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import OperationModal from "../shared/OperationModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState(new Date(0));
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [URL, setURL] = useState(null);
  const [status, setStatus] = useState(null);


  function handleSubmit(e) {
    if (!validateEmail(email) || name.length < 6 || password.length < 8) {
      setStatus(400);
      setShowModal(true);
      return;
    }

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

    const url = "/register";
    axios
      .post(url, user)
      .then((response) => {
        setStatus(response.status);
        if (status === 200) {
          setAuthTokens(response.data);
          setLoggedIn(true);
        } else {
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    if (status === 200) {
      setURL("/profile");
    }
  }

  //Redirect user if user is already logged in
  if (localStorage.getItem("loggedIn") === "true" || localStorage.getItem("loggedIn") === true) {
    return <Redirect to="/" />;
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && email.length > 6;
  }

  return (
    <div className="registerform">
      <OperationModal
        status={status}
        show={showModal}
        onHandleClose={() => {
          handleClose();
        }}
      ></OperationModal>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Register</Card.Header>
        <br></br>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="email">
            <Form.Label><span><FontAwesomeIcon icon="at"></FontAwesomeIcon> Email Address  </span> </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
            {!validateEmail(email) && (<Form.Text>Please enter a valid email</Form.Text>)}
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label><span><FontAwesomeIcon icon="user"></FontAwesomeIcon> Name  </span> </Form.Label>
            <Form.Control
              type="string"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => { setName(e.target.value); }}
            />
            {name.length < 6 && (<Form.Text> Please enter a name greater than 6 characters </Form.Text>)}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label><span><FontAwesomeIcon icon="key"></FontAwesomeIcon> Password  </span> </Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
            />
            {password.length < 8 && (<Form.Text> Please enter a password greater than 8 characters </Form.Text>)}
          </Form.Group>

          <Form.Group controlId="dateofbirth">
            <Form.Label><span><FontAwesomeIcon icon="calendar"></FontAwesomeIcon> Date of Birth  </span> </Form.Label>
            <Form.Control
              type="date"
              name="dateofbirth"
              value={dob}
              onChange={(e) => { setDOB(e.target.value); }}
              placeholder="Date of Birth"
            />
            {dob <= new Date() && (<Form.Text>Please choose a valid DOB</Form.Text>)}
          </Form.Group>

          <Button variant="primary" onClick={(e) => { handleSubmit(e); }}> Submit </Button>
          <br></br>

          <Link to="/login">Already have an account?</Link>
        </Form>
      </Card>
    </div>
  );
}

export default withRouter(Register);
