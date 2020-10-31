import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../styles/Login.scss";
import "../../styles/Logout.scss";
import "../context/auth.jsx";

function Logout(props) {
  function handleLogout(e) {
    localStorage.setItem('userID', null);
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('authToken', null);
    localStorage.setItem('tokens', null);
    localStorage.setItem('user', null);
    localStorage.setItem('username', null);
  }

  //redirect user if user is already logged in
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
