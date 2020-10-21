import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Requests.scss";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import PlaceholderImage from "../img/placeholder.png";


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

            //turn request into a favour that I owe to the request creator
            const favour = {
              token: localStorage.getItem("authToken"),
              creditorID: OwnerID, // request creator email
              debitorID: debitorID, //my email
              externalemail: owner.email,
              owed: owner.email,
              name: request.name,
              content: request.content,
              chocolates: request.chocolates,
              mints: request.mints,
              pizzas: request.pizzas,
              coffees: request.coffees,
              candies: request.candies,
              completed: false,
              rewards: "da",
            };

            const urlFavour = "http://localhost:9000/favour/requestToFavour";
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
<div id="requests">
<h1> Requests</h1>
      <p>  These are public requests made by others </p>
        <Row max-width="100%">
        {requests.map((request) => (
          <Col sm={12} md={4} lg={3} className="request-card-container">
            <Card className="request-card">
            <Card.Img variant="top" className="card-img" style={{backgroundImage: `url(${PlaceholderImage})` }}/>
            <Card.Body>
             <Card.Title> {request.name} </Card.Title>
            <Card.Text>
            {request.content}
            {request.chocolates != 0 && request.chocolates != null &&
              (
                <p> Chocolates: {request.chocolates} </p>
              )}

            {request.mints != 0 && request.mints != null &&
              (
                <p> Mints: {request.mints} </p>
              )}

            {request.pizzas != 0 && request.pizzas != null &&
              (
                <p> Pizzas: {request.pizzas} </p>
              )}

            {request.coffees != 0 && request.coffees != null &&
              (
                <p> Coffees: {request.coffees} </p>
              )}

            {request.candies != 0 && request.candies != null &&
              (
                <p> Candies: {request.candies} </p>
              )}
      </Card.Text>
      </Card.Body>

      <Card.Footer>
            {localStorage.getItem("userID") != request.ownerID &&
              (
                <Button onClick={() => handleAccept(request)} variant="success">Accept</Button>
              )}
              </Card.Footer>
              </Card>
          </Col>
        ))}
        </Row>
        </div>
  );
}

export default Requests;
