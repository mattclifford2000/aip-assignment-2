import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import RequestCard from "../shared/RequestCard";
import "./../../styles/Requests.scss";


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
         <RequestCard request={request} onAccept={()=> {this.handleAccept(request)}}></RequestCard> //onaccept add
        ))}
        </Row>
        </div>
  );
}

export default Requests;
