import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Home.css";
import RequestComp from "./functionalComponents/request.comp"


function Profile(props) {
  const [requests, setRequests] = useState([]);


  const [owed, setOwed] = useState([]);
  const [owing, setOwing] = useState([]);

  const [userID, setUserID] = useState(localStorage.getItem('userID'))

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem('userID'));

    axios
      .post("/request/delete", {
        requestID: e.target.value,
        authToken: localStorage.getItem('authToken')
      })
      .then((res) => {
        setRequests(res.data);
      });
  }


  useEffect(() => {

    axios
      .post("/request/mine", { authToken: localStorage.getItem('authToken') })
      .then((res) => {
        setRequests(res.data);
      });

    const owedUrl = "http://localhost:9000/favour/myOwedFavours";
    const owingUrl = "http://localhost:9000/favour/myOwingFavours";

    axios
      .post(owedUrl, { userID })
      .then((response) => {
        setOwed(response.data)
      })

    axios
      .post(owingUrl, { userID })
      .then((response) => {
        setOwing(response.data)
      })
  }, []);

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

      <h1> Owing </h1>
      <ol class="requestList">
        {owed.map((favour) => (
          <li class="request">
            <h1> {favour.name} </h1>
            <p>Request Description: {favour.content}</p>
          </li>
        ))}
      </ol>
      <h1> Owed </h1>
      <ol class="requestList">
        {owing.map((favour) => (
          <li class="request">
            <h1> {favour.name} </h1>
            <p>Request Description: {favour.content}</p>
          </li>
        ))}
      </ol>

    </div>
  );
}

export default Profile;

