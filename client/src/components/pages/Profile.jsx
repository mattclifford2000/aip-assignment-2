import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Row, Alert } from "react-bootstrap";
import "./../../styles/Home.scss";
import "./../../styles/Profile.scss";
import RequestCard from "../functionalComponents/request.comp";
import OwingFavourCard from "../shared/OwingFavourCard";
import CompletedCard from "../shared/CompletedCard";
import OwedFavourCard from "../shared/OwedFavourCard";
import MyOwedFavours from "../profile/MyOwedFavours";
import MyOwingFavours from "../profile/MyOwingFavours";
import MyRequests from "../profile/MyRequests";
import MyCompleted from "../profile/MyCompleted";
import { Redirect, withRouter } from "react-router-dom";
import io from 'socket.io-client';
var socket = null;


function Profile(props) {
  const [owed, setOwed] = useState([]);
  const [owing, setOwing] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [users, setUsers] = useState([])
  const [completed, setCompleted] = useState([])
  const [userID] = useState(localStorage.getItem('userID'))
  const [token] = useState(localStorage.getItem('authToken'))

  const requestURL = "/request/myRequests"
  const owedURL = "/favour/myOwedFavours";
  const owingURL = "/favour/myOwingFavours";
  const completedURL = "/favour/myCompletedFavours";
  const findUserURL = "/user/findUserByID"
  const completeFavourURL = "/favour/complete";
  const userAddScoreURL = "/Lists/addScore";
  const deleteURL = "/request/delete";

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

      <MyRequests></MyRequests>
      <MyOwedFavours></MyOwedFavours>
      <MyOwingFavours></MyOwingFavours>
      <MyCompleted></MyCompleted>

    </div>
  );
}

export default Profile;
