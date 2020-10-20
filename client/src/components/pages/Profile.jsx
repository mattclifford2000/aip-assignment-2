import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Home.css";
import RequestComp from "./functionalComponents/request.comp"
import { Button, Form, Card } from "react-bootstrap";


function Profile(props) {
  const [requests, setRequests] = useState([]);


  const [owed, setOwed] = useState([]);
  const [owing, setOwing] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

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


  function handleComplete(favour) {
    const favourDelete = "http://localhost:9000/favour/delete";
    axios
      .post(favourDelete, favour)
      .then((response) => {
      })
  }




  useEffect(() => {


    /*
    axios
      .post("/request/mine", { authToken: localStorage.getItem('authToken') })
      .then((res) => {
        setRequests(res.data);
      });
*/


    const requestUrl = "http://localhost:9000/request/myRequests"
    const owedUrl = "http://localhost:9000/favour/myOwedFavours";
    const owingUrl = "http://localhost:9000/favour/myOwingFavours";


    axios
      .post(requestUrl, { userID })
      .then((response) => {
        setMyRequests(response.data)
      })

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
  }, [owed]);

  return (
    <div class="center">
      <h1>{localStorage.getItem('username')}</h1>
      <h2> My Requests </h2>
      <p>  Public requests you've made </p>
      <ul class="requestList">
        {myRequests.map((request) => (
          <li class="request">
            <h2> {request.name} </h2>
            <p>Request Description: {request.content}</p>
          </li>
        ))}
      </ul>

      <h2> Owing favours </h2>
      <p>  Favours that you owe others </p>
      <ol class="requestList">
        {owed.map((favour) => (
          <li class="request">
            <h2> {favour.name} </h2>
            <p>Request Description: {favour.content}</p>

            <Button onClick={() => handleComplete(favour)} >Complete</Button>

          </li>
        ))}
      </ol>
      <h2> Owed Favours </h2>
      <p>  Favours that others owe you </p>
      <ol class="requestList">
        {owing.map((favour) => (
          <li class="request">
            <h2> {favour.name} </h2>
            <p>Request Description: {favour.content}</p>
            <Button onClick={() => handleComplete(favour)} >Complete</Button>

          </li>
        ))}
      </ol>

    </div>
  );
}

export default Profile;

