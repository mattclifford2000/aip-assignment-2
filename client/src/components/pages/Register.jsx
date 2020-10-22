
import axios from "axios";
import React, { useState } from "react"; //eslint-disable-line
import { Button, Card, Form, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "../../styles/Login.css";
import "../context/auth.jsx";
import { useAuth } from "../context/auth.jsx";
import { Error } from "../shared/AuthForm";
import OperationModal from "../shared/OperationModal"


function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState(new Date(0));
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();
  //const [errors, setErrors] = useState();
  const [showModal, setShowModal] = useState(false);
  const [URL, setURL] = useState(null);
  const [status, setStatus] = useState(null);



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
    console.log(user);
    console.log({user});

    const url = "http://localhost:9000/register";
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

  function handleClose () {
    setShowModal(false);
    if(status === 200){
      setURL("/profile");
    }
  };

  if (localStorage.getItem('loggedIn') === true) {
    return <Redirect to="/" />;
  }

  if(URL !== null){
    return(<Redirect to={URL}></Redirect>)
  }

  return (
    
    <div className="registerform">
    <OperationModal status={status} show={showModal} onHandleClose={() => {handleClose()}}></OperationModal>
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
            {(email.length < 6) && <Form.Text>Please enter a valid email</Form.Text>}
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
            {(name.length < 6) && <Form.Text>Please enter a name greater than 6 characters</Form.Text>}

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
                        {(password.length < 6) && <Form.Text>Please enter a password greater than 8 characters</Form.Text>}

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
                        {<Form.Text>Please choose a valid DOB</Form.Text>}

          </Form.Group>       
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <br></br>

          <Link to="/login">Already have an account?</Link>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
