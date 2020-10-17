import React, { Component, useState, useEffect } from 'react';
import "./../../styles/Home.css";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";


function SearchRequests(props) {
    const [requests, setRequests] = useState([]);


    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        const query = "6666";

        const url = "http://localhost:9000/request/searchRequest";


        axios
            .post(url, { query })
    }


    return (
        <div>
            <h1> Requests</h1>
            <Form onSubmit={handleSubmit} noValidate>
                <Button variant="primary" type="submit">
                    Submit
          </Button>
                <Link to="/register">Don't have an account?</Link>
            </Form>
        </div>
    );
}

export default SearchRequests;

