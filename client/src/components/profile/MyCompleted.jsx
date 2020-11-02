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


function MyCompleted(props) {
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


    //redirect user if user is not logged in
    if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === false) {
        return <Redirect to="/login" />;
    }


    return (
        <div class="center">
            <h2> Completed ({completed.length}) </h2>
            <p>  Favours that others owed you and have completed  </p>
            <Row max-width="100%"> {completed.map((favour) => (<CompletedCard favour={favour} ></CompletedCard>))} </Row>
            {completed.length === 0 &&
                <Alert id="emptyInfo" variant="info" className="profileAlert" role="alert">
                    No completed favours! Start accepting and completing requests to see something here!
        </Alert>}

        </div>
    );
}

export default MyCompleted;

