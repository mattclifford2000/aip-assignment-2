import axios from "axios";
import React, { useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
import "../../styles/searchRequests.css";
import "./../../styles/Home.css";

function NewRequests(props) {
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

    console.log(request)

    const url = "/request/new";
    axios
      .post(url, { request, authToken: localStorage.getItem('authToken') } )
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
            <h3> Rewards: </h3>
            <Form.Group controlId="searchRequests">
              <Form.Label>Chocolates</Form.Label>
              <Form.Control
                name="content"
                type="number"
                placeholder={chocolates}
                value={chocolates}
                onChange={(e) => {
                  setChocolates(parseInt(e.target.value));
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
                  setMints(parseInt(e.target.value));
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
                  setPizzas(parseInt(e.target.value));
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
                  setCoffees(parseInt(e.target.value));
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
                  setCandies(parseInt(e.target.value));
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

export default NewRequests;

