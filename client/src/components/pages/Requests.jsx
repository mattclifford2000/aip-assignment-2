import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Row, Modal, Button } from "react-bootstrap";
import RequestCard from "../functionalComponents/request.comp";
import "./../../styles/Requests.scss";
import io from 'socket.io-client';
import OperationModal from "../shared/OperationModal";
const socket = io();

function Requests(props) {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(200);
  const [deleteShow, setDeleteShow] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const favourURL = "/favour/acceptRequest";
  const requestURL = "/request/acceptRequest";

  useEffect(() => {
    axios.get("/request").then((res) => {
      setRequests(res.data);
    })
  }, []);

  useEffect(() => {
    //Handle deleted request
    socket.on("deleteRequest", requestID => {
      let newRequests = requests;
      for (var i = 0, len = newRequests.length; i < len; ++i) {
        if (newRequests[i]._id === requestID) {
          newRequests.splice(i, 1);
        }
      }
      setRequests(newRequests);
    });
    socket.on("addRequest", newRequest => {
      setRequests(requests.concat(newRequest));
    })
  });

  //delete request
  const handleDelete = (request) => {
    console.log(localStorage.getItem('userID'));
    axios
      .post("/request/delete", {
        requestID: request._id,
        authToken: localStorage.getItem('authToken')
      })
      .then((res) => {
        setDeleteShow(true);
      });

    setShowModal(true);
  }

  //accept request
  function handleAccept(request) {
    const favour = {
      debitorID: request.ownerID,
      creditorID: localStorage.getItem("userID"),
      creditorName: localStorage.getItem("username"),
      debitorName: request.ownerName,
      name: request.name,
      content: request.content,
      completed: false,
      chocolates: request.chocolates,
      mints: request.mints,
      pizzas: request.pizzas,
      coffees: request.coffees,
      candies: request.candies,
    }

    //convert request to owed favour by creating new favour using request details
    axios
      .post(favourURL, favour)

    //delete request from database
    const _id = request._id
    axios
      .post(requestURL, { _id })
    setShowModal(true);
  }

  //close modal
  function handleClose() {
    setShowModal(false);
  }

  return (
    <div id="requests">
      <h1> Requests</h1>
      <p>  These are public requests made by others </p>

      {(localStorage.getItem('loggedIn') === null || localStorage.getItem('loggedIn') === "false") &&
        (<p>  Log in to start accepting requests </p>)}

      <Row max-width="100%" padding="0">
        {requests.map((request) => (<RequestCard request={request} onAccept={() => { handleAccept(request) }} onDelete={() => { handleDelete(request) }}></RequestCard>))}
      </Row>

      <OperationModal
        status={status}
        show={showModal}
        onHandleClose={() => {
          handleClose();
        }}
      ></OperationModal>

    </div>
  );
}

export default Requests;
