import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Row } from "react-bootstrap";
import RequestComp from "../functionalComponents/request.comp";
import "./../../styles/Home.css";
import "./../../styles/Profile.css";
import RequestCard from "../shared/RequestCard";
import OwedFavourCard from "../shared/OwedFavourCard";
import CompletedCard from "../shared/CompletedCard";
import OwingFavourCard from "../shared/OwingFavourCard";
import { Link, Redirect } from "react-router-dom";

function Profile(props) {
  const [requests, setRequests] = useState([]);


  const [owed, setOwed] = useState([]);
  const [owing, setOwing] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [users, setUsers] = useState([])
  const [completed, setCompleted] = useState([])
  const [userID, setUserID] = useState(localStorage.getItem('userID'))

  const requestURL = "/request/myRequests"
  const owedURL = "/favour/myOwedFavours";
  const owingURL = "/favour/myOwingFavours";
  const completedURL = "/favour/myCompletedFavours";


  useEffect(() => {

    axios
      .post(requestURL, { userID })
      .then((response) => {
        setMyRequests(response.data)
      })

    axios
      .post(owedURL, { userID })
      .then((response) => {
        setOwed(response.data)
      })

    axios
      .post(owingURL, { userID })
      .then((response) => {
        setOwing(response.data)
      })


    axios
      .post(completedURL, { userID })
      .then((response) => {
        setCompleted(response.data)
      })


    const findUser = "/login/findUserProfile"
    axios
      .post(findUser, { userID })
      .then((response) => {
        setUsers(response.data)
      })
  }, [owed]);


  if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === false) {
    return <Redirect to="/login" />;
  }


  const handleDelete = (request) => {
    //e.preventDefault();
    console.log(localStorage.getItem('userID'));

    axios
      .post("/request/delete", {
        requestID: request._id,
        authToken: localStorage.getItem('authToken')
      })
      .then((res) => {
        setRequests(res.data);
      });

    setShowRequest(true)
  }


  const handleClose = (e) => {
    setShow(false)
    setShowRequest(false)
  }


  const handleRequestClose = (e) => {
    setShowRequest(false)
  }


  function handleComplete(favour) {
    const favourDelete = "/favour/delete"; //we dont want to delete favours, we want to mark them complete in some cases
    axios
      .post(favourDelete, favour)
      .then((response) => {
      })


    const userAddScore = "/login/addScore"; //on login route for now. Will create a new route for user editing later 
    axios
      .post(userAddScore, { userID })
      .then((response) => {
      })

    setShow(true)
  }






  return (
    <div class="center">


      <Card style={{ width: '30rem' }} id="profile">
        <Card.Header as="h5" >      <h1>{localStorage.getItem('username')}</h1></Card.Header>
        <Card.Body>
          <p> Score: {users.score} </p>
          <p> Requests: {myRequests.length} </p>
          <p> Owing favours: {owed.length} </p>
          <p> Owed favours: {owing.length} </p>
          <p> Completed: {completed.length} </p>
        </Card.Body>
      </Card>


      <h2> Requests ({myRequests.length})  </h2>
      <p>  Public requests you've made </p>

      <Row max-width="100%">
        {myRequests.map((request) => (
          <RequestCard request={request} onAccept={() => { handleComplete(request) }} onDelete={() => { handleDelete(request) }}></RequestCard> //onaccept add
        ))}
      </Row>
      {myRequests.length == 0 &&
        <div id="emptyInfo" class="alert alert-info" style={{ width: '30rem' }} role="alert">
          No requests! Create a request to see something here
</div>}


      <h2> Owing favours ({owed.length}) </h2>
      <p>  Favours that you owe others </p>
      <Row max-width="100%">
        {owed.map((favour) => (
          <OwedFavourCard favour={favour} onAccept={() => { handleComplete(favour) }}></OwedFavourCard> //onaccept add
        ))}
      </Row>
      {owed.length == 0 &&
        <div id="emptyInfo" class="alert alert-info" style={{ width: '30rem' }} role="alert">
          No owing favours! Create an owing favour to see something here
</div>}

      <h2> Owed Favours ({owing.length}) </h2>
      <p>  Favours that others owe you  </p>
      <Row max-width="100%">
        {owing.map((favour) => (
          <OwingFavourCard favour={favour} onAccept={() => { handleComplete(favour) }}></OwingFavourCard> //onaccept add
        ))}
      </Row>

      {owing.length == 0 &&
        <div id="emptyInfo" class="alert alert-info" style={{ width: '30rem' }} role="alert">
          No owed favours! Accept requests or create an owed favour to see something here
</div>}



      <h2> Completed ({completed.length}) </h2>
      <p>  Favours that others owed you and have completed  </p>
      <Row max-width="100%">
        {completed.map((favour) => (
          <CompletedCard favour={favour} onAccept={() => { handleComplete(favour) }}></CompletedCard> //onaccept add
        ))}
      </Row>
      {completed.length == 0 &&
        <div id="emptyInfo" class="alert alert-info" style={{ width: '30rem' }} role="alert">
          No completed favours! Start accepting and completing requests to see something here!
</div>}





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

