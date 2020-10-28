import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Row, Modal, Button } from "react-bootstrap";
import RequestCard from "../functionalComponents/request.comp";
import "./../../styles/Requests.scss";

function Requests(props) {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false)

  const favourURL = "/favour/acceptRequest";
  const requestURL = "/request/acceptRequest";

  useEffect(() => {
    axios.get("/request").then((res) => {
      setRequests(res.data);
    })
  }, [requests]);

  //close modal
  function handleClose(e) {
    setShow(false)
    setDeleteShow(false)
  }

  //delete request
  const handleDelete = (request) => {
    console.log(localStorage.getItem('userID'));
    axios
      .post("/request/delete", {
        requestID: request._id,
        authToken: localStorage.getItem('authToken')
      })
      .then((res) => {
        setRequests(res.data);
      });
    setDeleteShow(true)
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

    setShow(true)
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>You successfully accepted a request. It is now an owed favour on your profile page.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}> Ok </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteShow} onHide={handleClose}>
        <Modal.Body>You successfully deleted a request.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}> Ok </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Requests;
