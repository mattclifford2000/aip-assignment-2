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

    return (
        <div>
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
                <div> <h1> Requests </h1>
                    <p> {requests.length} result for "{resultIndicator}" </p> </div>}

            {/* Multiple results */}
            {resultIndicator != undefined && requests.length > 1 &&
                <div> <h1> Requests </h1>
                    <p> {requests.length} results for "{resultIndicator}" </p> </div>}

            {/* No results */}
            {resultIndicator != undefined && requests.length == 0 &&
                <div> <h1> Requests </h1>
                    <p> No results for "{resultIndicator}" </p> </div>}



            <ol class="requestList">
                {requests.map((request) => (
                    <li class="request">
                        <h1> {request.name} </h1>
                        <p>Request Description: {request.content}</p>
                        <p>Request ID (TESTING): {request._id}</p>
                        <p>Request userID (TESTING): {request.ownerID}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default SearchRequests;

