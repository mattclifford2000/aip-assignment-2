import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Request.css";
import { Button, Form, Card } from "react-bootstrap";


function Requests(props) {
  const [requests, setRequests] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  useEffect(() => {
    axios.get("/request").then((res) => {
      setRequests(res.data);
    })
  }, []);

  return (
    <div>
      <h1> Requests</h1>
      <ol class="requestList">
        {requests.map((request) => (
          <li class="request">
            <h1> {request.name} </h1>
            <p>Request Description: {request.content}</p>
            <p>Request ID (TESTING): {request._id}</p>
            <p>Request userID (TESTING): {request.ownerID}</p>
            <Button variant="secondary" href={'/request/' + request._id}>View Request</Button>

          </li>
        ))}
      </ol>
    </div>
  );
}

export default Requests;
