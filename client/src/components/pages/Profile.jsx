import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Row, Alert } from "react-bootstrap";
import "./../../styles/Home.scss";
import "./../../styles/Profile.scss";
import RequestCard from "../functionalComponents/request.comp";
import OwingFavourCard from "../shared/OwingFavourCard";
import CompletedCard from "../shared/CompletedCard";
import OwedFavourCard from "../shared/OwedFavourCard";
import { Redirect } from "react-router-dom";

function Profile(props) {
  const [owed, setOwed] = useState([]);
  const [owing, setOwing] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [users, setUsers] = useState([])
  const [completed, setCompleted] = useState([])
  const [userID] = useState(localStorage.getItem('userID'))

  const requestURL = "/request/myRequests"
  const owedURL = "/favour/myOwedFavours";
  const owingURL = "/favour/myOwingFavours";
  const completedURL = "/favour/myCompletedFavours";
  const findUserURL = "/login/findUserByID"
  const completeFavourURL = "/favour/complete";
  const userAddScoreURL = "/Lists/addScore";
  const deleteURL = "/request/delete";

  useEffect(() => {
    //find requests
    axios
      .post(requestURL, { userID })
      .then((response) => {
        setMyRequests(response.data)
      })
    //find owed favours (favours others owed you)
    axios
      .post(owedURL, { userID })
      .then((response) => {
        setOwed(response.data)
      })
    //find owing favours (favours you owe to others)
    axios
      .post(owingURL, { userID })
      .then((response) => {
        setOwing(response.data)
      })
    //find completed favours
    axios
      .post(completedURL, { userID })
      .then((response) => {
        setCompleted(response.data)
      })
    //find currently loggedin user
    axios
      .post(findUserURL, { userID })
      .then((response) => {
        setUsers(response.data)
      })
  }, [owed]);


  //delete unwanted requests
  const handleDelete = (request) => {
    console.log(localStorage.getItem('userID'));

    axios
      .post(deleteURL, {
        requestID: request._id,
        authToken: localStorage.getItem('authToken')
      });

    setShowRequest(true)
  }

  const handleClose = (e) => {
    setShow(false)
    setShowRequest(false)
  }

  //turn favour to completed status
  function handleComplete(favour) {

    axios
      .post(completeFavourURL, favour)
      .then((response) => {
      })

    axios
      .post(userAddScoreURL, { userID })
      .then((response) => {
      })

    setShow(true)
  }


  //redirect user if user is not logged in
  if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === false) {
    return <Redirect to="/login" />;
  }


  return (
    <div class="center">
      <Card className="profileCard">
        <Card.Header as="h5" > <h1>{localStorage.getItem('username')}</h1></Card.Header>
        <Card.Body>
          <p> Score: {users.score} </p>
          <p> Requests: {myRequests.length} </p> {/* Requests you've made */}
          <p> Owing favours: {owed.length} </p> {/* Favours you owe others */}
          <p> Owed favours: {owing.length} </p> {/* Favours you are owed by others */}
          <p> Completed: {completed.length} </p> {/* Favours others used to owe you but have completed */}
        </Card.Body>
      </Card>

      <h2> Requests ({myRequests.length})  </h2>
      <p>  Public requests you've made </p>
      <Row max-width="100%"> {myRequests.map((request) => (<RequestCard request={request} onAccept={() => { handleComplete(request) }} onDelete={() => { handleDelete(request) }}></RequestCard>))} </Row>
      {myRequests.length === 0 &&
        <Alert id="emptyInfo" variant="info" className="profileAlert" role="alert">
          No requests! Create a request to see something here
        </Alert>}

      <h2> Owing favours ({owed.length}) </h2>
      <p>  Favours that you owe others </p>
      <Row max-width="100%"> {owed.map((favour) => (<OwingFavourCard favour={favour} onAccept={() => { handleComplete(favour) }}></OwingFavourCard>))} </Row>
      {owed.length === 0 &&
        <Alert id="emptyInfo" variant="info" className="profileAlert" role="alert">
          No owing favours! Create an owing favour to see something here
         </Alert>}

      <h2> Owed Favours ({owing.length}) </h2>
      <p>  Favours that others owe you  </p>
      <Row max-width="100%"> {owing.map((favour) => (<OwedFavourCard favour={favour} onAccept={() => { handleComplete(favour) }}></OwedFavourCard>))} </Row>
      {owing.length === 0 &&
        <Alert id="emptyInfo" variant="info" className="profileAlert" role="alert">
          No owed favours! Accept requests or create an owed favour to see something here
        </Alert>}

      <h2> Completed ({completed.length}) </h2>
      <p>  Favours that others owed you and have completed  </p>
      <Row max-width="100%"> {completed.map((favour) => (<CompletedCard favour={favour} onAccept={() => { handleComplete(favour) }}></CompletedCard>))} </Row>
      {completed.length === 0 &&
        <Alert id="emptyInfo" variant="info" className="profileAlert" role="alert">
          No completed favours! Start accepting and completing requests to see something here!
        </Alert>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body> Congratulations! Favour completed successfully. You have earned 1 point
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRequest} onHide={handleClose}>
        <Modal.Body>You successfully deleted a request.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;

