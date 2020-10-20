import React, { Component, useState, useEffect } from 'react';
import "./../../styles/Home.css";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import "../../styles/searchRequests.css";

function SearchRequests(props) {
    const [requests, setRequests] = useState([]); //search results
    const [query, setQuery] = useState(); //search query
    const [resultIndicator, setResultIndicator] = useState(); //"results for..." text

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        const url = "http://localhost:9000/request/searchRequest";
        axios
            .post(url, { query })
            .then((response) => {
                setRequests(response.data)
            })
        setResultIndicator(query)
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

    return (
        <div>
            <h1> Search requests </h1>
            <p>  Search public requests </p>
            <div class="searchRequestForm">
                <Card style={{ width: "18rem" }}>
                    <Form onSubmit={handleSubmit} noValidate >
                        <Form.Group controlId="searchRequests">

                            <Form.Control
                                name="query"
                                type="query"
                                placeholder="Search for requests"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                         </Button>
                    </Form>
                </Card>
            </div>

            {/* Only show if a search query has been made */}
            {/* Single result */}
            {resultIndicator != undefined && requests.length == 1 &&
                <div>
                    <p> {requests.length} result for "{resultIndicator}" </p> </div>}

            {/* Multiple results */}
            {resultIndicator != undefined && requests.length > 1 &&
                <div>
                    <p> {requests.length} results for "{resultIndicator}" </p> </div>}

            {/* No results */}
            {resultIndicator != undefined && requests.length == 0 &&
                <div>
                    <p> No results for "{resultIndicator}" </p> </div>}



            <ol class="requestList">
                {requests.map((request) => (
                    <li class="request">
                        <h2> {request.name} </h2>

                        <p>Request Description: {request.content}</p>
                        {/*Do not show accept button if user created request or user is not logged in*/}
                        {localStorage.getItem("userID") != request.ownerID &&
                            (
                                <Button onClick={() => handleAccept(request)} variant="success">Accept</Button>
                            )}


                    </li>
                ))}
            </ol>
        </div>
    );
}

export default SearchRequests;

