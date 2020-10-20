import React, { Component, useState, useEffect } from 'react';
import "./../../styles/Home.css";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import "../../styles/searchRequests.css";

function SearchRequests(props) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [chocolates, setChocolates] = useState(0)
  const [mints, setMints] = useState(0)
  const [pizzas, setPizzas] = useState(0)
  const [coffees, setCoffees] = useState(0)
  const [candies, setCandies] = useState(0)

  function handleSubmit(e) {

    const request = {
      ownerID: localStorage.getItem("userID"),
      name: name,
      content: content,
      completed: false,
      chocolates: chocolates,
      mints: mints,
      pizzas: pizzas,
      coffees: coffees,
      candies: candies
    };


    const url = "http://localhost:9000/request/newRequest";
    axios
      .post(url, request)
      .then((response) => {
      })

  }




  return (
    <div>
      <h1> Submit a Request</h1>
      <div class="searchRequestForm">

        <Card style={{ width: "18rem" }}>
          <Form onSubmit={handleSubmit} noValidate >
            <Form.Group controlId="searchRequests">
              <Form.Label>Request name</Form.Label>
              <Form.Control
                name="name"
                type="query"
                placeholder="Request name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="searchRequests">
              <Form.Label>Request Description</Form.Label>
              <Form.Control
                name="content"
                type="query"
                placeholder="Request description"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="searchRequests">
              <Form.Label>Chocolates</Form.Label>
              <Form.Control
                name="content"
                type="number"
                placeholder={chocolates}
                value={chocolates}
                onChange={(e) => {
                  setChocolates(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="searchRequests">
              <Form.Label>Mints</Form.Label>
              <Form.Control
                name="content"
                type="number"
                placeholder={mints}
                value={mints}
                onChange={(e) => {
                  setMints(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="searchRequests">
              <Form.Label>Pizzas</Form.Label>
              <Form.Control
                name="content"
                type="number"
                placeholder={pizzas}
                value={pizzas}
                onChange={(e) => {
                  setPizzas(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="searchRequests">
              <Form.Label>Coffees</Form.Label>
              <Form.Control
                name="content"
                type="number"
                placeholder={coffees}
                value={coffees}
                onChange={(e) => {
                  setCoffees(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="searchRequests">
              <Form.Label>Candies</Form.Label>
              <Form.Control
                name="content"
                type="number"
                placeholder={candies}
                value={candies}
                onChange={(e) => {
                  setCandies(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>

    </div>
  );
}

export default SearchRequests;

