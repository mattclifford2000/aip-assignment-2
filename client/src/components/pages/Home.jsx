import React, { Component, useState } from "react";
import Leaderboard from "../shared/Leaderboard";
import "./../../styles/Home.css";
import { Button, Form, Card } from "react-bootstrap";


// function setData(data) {
//   localStorage.setItem('user', data);
// }

// function getData() {
//   let data = localStorage.getItem('user');
//   console.log(data);
// }


function Home(props) {
  return (
    <div class="center">
      Welcome to the Favour Centre!
      <p>Username:</p>
      <p>{localStorage.getItem('user')}</p>
      <p>Auth Token (hide it!):</p>
      <p>{localStorage.getItem('authToken')}</p>
      <p>Are we logged in?</p>
      <p>{localStorage.getItem('loggedIn')}</p>
      <Leaderboard />
    </div>
  );
}

export default Home;
