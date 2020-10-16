import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Home.css";
import RequestComp from "./functionalComponents/request.comp"


function Profile(props) {
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    axios
      .post("/request/mine",  { authToken: localStorage.getItem('authToken') })
      .then((res) => {
        setRequests(res.data);
      });
  });

  const handleDelete = (e) => {
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
      .post("/request/mine",  { authToken: localStorage.getItem('authToken') })
      .then((res) => {
        setRequests(res.data);
      });
  }, requests);

  return (
    <div class="center">
      <p>Hello {localStorage.getItem('username')}!</p>
      <h1> Requests </h1>
      <ul class="requestList">
        {requests.map((request) => (
          <li class="request">
            <RequestComp request={request} setRequests={setRequests} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;

