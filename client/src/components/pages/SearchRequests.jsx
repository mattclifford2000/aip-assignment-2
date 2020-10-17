import React, { Component, useState, useEffect } from 'react';
import "./../../styles/Home.css";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "../../styles/searchRequests.css";

function SearchRequests(props) {
    const [requests, setRequests] = useState([]);
    const [query, setQuery] = useState([]);


    function handleSubmit(e) {

        console.log(e.target.value);
        const url = "http://localhost:9000/request/searchRequest";

        axios
            .post(url, { query })
            .then((response) => {
                setRequests(response.data)
            })
    }



    return (
        <div class="searchRequestForm">
            <h1> Search requests</h1>
            <Card style={{ width: "18rem" }}>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group controlId="password">
                        <Form.Control
                            name="query"
                            type="query"
                            placeholder="query"
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
    );
}

export default SearchRequests;

