import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Home.css";
import { Button, Form, Card } from "react-bootstrap";





function Profile(props) {
  const [requests, setRequests] = useState([]);


  function handleDelete(e) {
    e.preventDefault();
    console.log(localStorage.getItem('userID'));
    axios
      .post("/request/delete", { requestID: e.target.value,
                                 authToken: localStorage.getItem('authToken')
      })
      .then((res) => {
        setRequests(res.data);
      });
  }


  useEffect(() => {
    axios
      .post("/request/mine",  { name: localStorage.getItem('username') })
      .then((res) => {
        setRequests(res.data);
      });
  });


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
            <Button value={request._id} variant="danger" type="submit" onClick={handleDelete}>
              DELETE
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Profile;

