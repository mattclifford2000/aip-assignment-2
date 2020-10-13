import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Home.css";




function Profile(props) {
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    axios
      .post("/request/mine",  { name: localStorage.getItem('username') })
      .then((res) => {
        setRequests(res.data);
      })
  });

  console.log(localStorage.getItem('user'));
  console.log(localStorage.getItem('loggedIn'));


  return (
    <div class="center">
      <p>Hello {localStorage.getItem('username')}!</p>
      <h1> Requests </h1>
      <ol class="requestList">
        {requests.map((request) => (
          <li class="request">
            <h1> {request.requestname} </h1>
            <p>Request Description: {request.requestcontent}</p>
            <p>Request ID (TESTING): {request._id}</p>
            <p>Request userID (TESTING): {request.ownerID}</p>

          </li>
        ))}
      </ol>
    </div>
  );
}

export default Profile;

