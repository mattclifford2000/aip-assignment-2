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
  });

  return (
    <div>
      <h1> Requests</h1>
      <ol class="requestList">
        {requests.map((request) => (
          <li class="request">
            <h1> {request.requestname} </h1>
            <p>Request Description: {request.requestcontent}</p>
            <p>Request ID (TESTING): {request._id}</p>
            <p>Request userID (TESTING): {request.ownerID}</p>

            {/* Only show rewards that are entered. No blank rewards */}
            {/*See whether we want static items, or stored in an array in the future? */}
            {/*
            {request.cupcakes > 0 && <p> Cupcakes: {request.cupcakes} </p>}
            {request.chocolates > 0 && (
              <p> Chocolates: {request.chocolates} </p>
            )}
            {request.mints > 0 && <p> Mints: {request.mints} </p>}
            {request.coffees > 0 && <p> Coffees: {request.coffees} </p>}
            {request.icecreams > 0 && <p> Icecreams: {request.icecreams} </p>}
            */}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Requests;
