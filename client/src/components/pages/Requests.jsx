import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Request.css";
import { Button, Form, Card } from "react-bootstrap";


function Requests(props) {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
  }




  function handleAccept(request) {

    const urlUser = "http://localhost:9000/login/findUser";
    const OwnerID = request.ownerID;
    const owner = "";


    const urlUserOther = "http://localhost:9000/login/findUserOther";
    const debitorID = localStorage.getItem('userID')
    const debitor = "";




    //get request creator's email address for favour debitorID
    axios
      .post(urlUser, { OwnerID })
      .then((res) => {
        const owner = res.data
        console.log("owner email: " + owner.email)


        //get my email
        axios
          .post(urlUserOther, { debitorID })
          .then((res) => {
            const debitor = res.data
            console.log("debitor email: " + debitor.email)

            //create favour
            const favour = {
              token: localStorage.getItem("authToken"),
              creditorID: debitorID,
              debitorID: OwnerID,
              externalemail: owner.email,
              owed: owner.email,
              name: request.name,
              content: request.content,
              completed: false,
              rewards: "da",
            };

            const urlFavour = "http://localhost:9000/favour/new";
            axios
              .post(urlFavour, favour)
              .then((response) => {
                console.log(response);

                //delete request from database
                const url = "http://localhost:9000/request/acceptRequest";
                const _id = request._id
                axios
                  .post(url, { _id })
                  .then((response) => {
                  })
              })
          })
      })

  }

  useEffect(() => {
    axios.get("/request").then((res) => {
      setRequests(res.data);
    })
  });

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
            <Button onClick={() => handleAccept(request)}>Accept</Button>
            <Button variant="secondary" href={'/request/' + request._id}>View Request</Button>

          </li>
        ))}
      </ol>
    </div>
  );
}

export default Requests;
