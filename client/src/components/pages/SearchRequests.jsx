import React, { Component, useState, useEffect } from 'react';
import "./../../styles/Home.css";
import axios from "axios";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import "../../styles/searchRequests.css";
import { useParams } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM, { render } from "react-dom";
import SearchBox from "../shared/SearchBox";



function SearchRequests(props) {
    const [requests, setRequests] = useState([]); //search results
    let { query } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [resultIndicator, setResultIndicator] = useState(); //"results for..." text

    useEffect(() => {
        if(query){
        const url = "http://localhost:9000/request/searchRequest";
        axios
            .post(url, { query })
            .then((response) => {
                setRequests(response.data);
            })
        setResultIndicator(query);
    }
    setLoading(false);

}, []);


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


  if (isLoading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>;
  }

    return (
        <div>
            <h1> Search requests </h1>
            <p>  Search public requests </p>
            <SearchBox initType="requests"></SearchBox>
            {/*
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
                            */}

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

                        <h3> Rewards </h3>
                        {request.chocolates != 0 && request.chocolates != null &&
                            (
                                <p> Chocolates: {request.chocolates} </p>
                            )}

                        {request.mints != 0 && request.mints != null &&
                            (
                                <p> Mints: {request.mints} </p>
                            )}

                        {request.pizzas != 0 && request.pizzas != null &&
                            (
                                <p> Pizzas: {request.pizzas} </p>
                            )}

                        {request.coffees != 0 && request.coffees != null &&
                            (
                                <p> Coffees: {request.coffees} </p>
                            )}

                        {request.candies != 0 && request.candies != null &&
                            (
                                <p> Candies: {request.candies} </p>
                            )}
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

//export default SearchRequests;
export default function App() {
    return (
      <Router>
        <Switch>
          <Route path="/searchrequests/:query" children={<SearchRequests />} />
          <Route path="/searchrequests/" children={<SearchRequests />} />

        </Switch>
      </Router>
    );
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

