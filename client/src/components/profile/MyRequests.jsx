import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Row, Alert } from "react-bootstrap";
import RequestCard from "../functionalComponents/request.comp";
import io from 'socket.io-client';
var socket = null;

function MyRequests(props) {
  const [owed, setOwed] = useState([]);
  const [owing, setOwing] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [users, setUsers] = useState([])
  const [completed, setCompleted] = useState([])
  const [userID] = useState(localStorage.getItem('userID'))

  const requestURL = "/request/myRequests"
  const deleteURL = "/request/delete";

  useEffect(() => {
    socket = io({
      query: {
        userID: userID,
      }
    }
    );
    //find requests
    axios
      .post(requestURL, { userID })
      .then((response) => {
        //setMyRequests(response.data)
        setMyRequests(response.data);
      });
  }, []);


  useEffect(() => {
    //Handle deleted request
    socket.on("deleteRequest", requestID => {
      let newRequests = myRequests;
      let i = newRequests.length;
      while (i--) {
        if (myRequests[i]._id === requestID) {
          newRequests.splice(i, 1);
        }
      }
      setMyRequests(newRequests);
    });
  });



  const handleDelete = (request) => {
    console.log(localStorage.getItem('userID'));
    axios
      .post(deleteURL, {
        requestID: request._id,
        authToken: localStorage.getItem('authToken')
      });
    setShowRequest(true)
  }


  return (
    <div>
      <h2> Requests new component ({myRequests.length})  </h2>
      <p>  Public requests you've made </p>
      <Row max-width="100%"> {myRequests.map((request) => (<RequestCard request={request} onDelete={() => { handleDelete(request) }}></RequestCard>))} </Row>
      {myRequests.length === 0 &&
        <Alert id="emptyInfo" variant="info" className="profileAlert" role="alert">
          No requests! Create a request to see something here
      </Alert>}
    </div>
  )
}

export default MyRequests;

