import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Row, Alert } from "react-bootstrap";
import "./../../styles/Home.scss";
import "./../../styles/Profile.scss";
import RequestCard from "../functionalComponents/request.comp";
import OwingFavourCard from "../shared/OwingFavourCard";
import CompletedCard from "../shared/CompletedCard";
import OwedFavourCard from "../shared/OwedFavourCard";
import { Redirect, withRouter } from "react-router-dom";
import io from 'socket.io-client';
var socket = null;


function MyOwedFavours(props) {
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
    const findUserURL = "/user/findUserByID"
    const completeFavourURL = "/favour/complete";
    const userAddScoreURL = "/Lists/addScore";
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
        //find owed favours (favours others owed you)
        axios
            .post(owedURL, { userID })
            .then((response) => {
                setOwed(response.data)
            });
        //find owing favours (favours you owe to others)
        axios
            .post(owingURL, { userID })
            .then((response) => {
                setOwing(response.data)
            });
        //find completed favours
        axios
            .post(completedURL, { userID })
            .then((response) => {
                setCompleted(response.data)
            });
        //find currently loggedin user
        axios
            .post(findUserURL, { userID })
            .then((response) => {
                setUsers(response.data)
            });
    }, []);


    useEffect(() => {
        socket.on('addFavour', favour => {
            console.log(favour);
            let section = determineFavourSection(favour);
            if (section) {
                section[1](section[0].concat(favour));
            }
        });
        socket.on('deleteFavour', favour => {
            let section = determineFavourSection(favour);
            if (section) {
                let newSection = section[0];
                let i = newSection.length;
                while (i--) {
                    if (section[0][i]._id == favour._id) {
                        newSection.splice(i, 1);
                    }
                }
                section[1](newSection);
            };
        });
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
        socket.on("addRequest", newRequest => {
            setMyRequests(myRequests.concat(newRequest));
        })
    });

    function determineFavourSection(favour) {
        if (favour.creditorID === userID && favour.completed === false) {
            return ([owed, setOwed]);
        }
        if (favour.debitorID === userID && favour.completed === false) {
            return ([owing, setOwing]);
        }
        if (favour.debitorID === userID && favour.completed === true) {
            return ([completed, setCompleted]);
        }
        return;
    }


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
            .post(completeFavourURL, favour);
        axios
            .post(userAddScoreURL, { userID });
        setShow(true)
    }


    //redirect user if user is not logged in
    if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === false) {
        return <Redirect to="/login" />;
    }


    return (
        <div class="center">
            <h2> Owed Favours new ({owing.length}) </h2>
            <p>  Favours that others owe you  </p>
            <Row max-width="100%"> {owing.map((favour) => (<OwedFavourCard favour={favour} onAccept={() => { handleComplete(favour) }}></OwedFavourCard>))} </Row>
            {owing.length === 0 &&
                <Alert id="emptyInfo" variant="info" className="profileAlert" role="alert">
                    No owed favours! Accept requests or create an owed favour to see something here
        </Alert>}


        </div>
    );
}

export default MyOwedFavours;

