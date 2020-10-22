import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import RequestComp from "../functionalComponents/request.comp";
import "./../../styles/Home.css";


function Profile(props) {
  const [requests, setRequests] = useState([]);


  const [owed, setOwed] = useState([]);
  const [owing, setOwing] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [showRequest, setShowRequest] = useState(false);


  const [userID, setUserID] = useState(localStorage.getItem('userID'))

  const requestURL = "/request/myRequests"
  const owedURL = "/favour/myOwedFavours";
  const owingURL = "/favour/myOwingFavours";

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

    setShowRequest(true)
  }


  const handleClose = (e) => {
    setShow(false)
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

    /*
        const userAddScore = "/login/addScore"; //on login route for now. Will create a new route for user editing later 
        axios
          .post(userAddScore, { userID })
          .then((response) => {
          })
    */
    setShow(true)
  }




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
  }, [owed]);



  return (
    <div class="center">
      <h1>{localStorage.getItem('username')}</h1>
      <h2> My Requests </h2>
      <p>  Public requests you've made </p>
      <ul class="requestList">
        {myRequests.map((request) => (
          <li class="request">
            <RequestComp request={request} setRequests={setMyRequests} />
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
            <h3> Rewards: </h3>
            {favour.chocolates != 0 && favour.chocolates != null &&
              (
                <p> Chocolates: {favour.chocolates} </p>
              )}

            {favour.mints != 0 && favour.mints != null &&
              (
                <p> Mints: {favour.mints} </p>
              )}

            {favour.pizzas != 0 && favour.pizzas != null &&
              (
                <p> Pizzas: {favour.pizzas} </p>
              )}

            {favour.coffees != 0 && favour.coffees != null &&
              (
                <p> Coffees: {favour.coffees} </p>
              )}

            {favour.candies != 0 && favour.candies != null &&
              (
                <p> Candies: {favour.candies} </p>
              )}
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





      <Modal show={show} onHide={handleClose}>
        <Modal.Body> Congratulations! Favour completed successfully
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showRequest} onHide={handleRequestClose}>
        <Modal.Body> Request successfully deleted
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRequestClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}

export default Profile;

