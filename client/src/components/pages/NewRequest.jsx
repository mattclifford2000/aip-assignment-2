import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import "../../styles/searchRequests.css";
import "./../../styles/Home.css";
import OperationModal from "../shared/OperationModal";
import { Link, Redirect, withRouter } from "react-router-dom";

function NewRequests(props) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [chocolates, setChocolates] = useState(0);
  const [mints, setMints] = useState(0);
  const [pizzas, setPizzas] = useState(0);
  const [coffees, setCoffees] = useState(0);
  const [candies, setCandies] = useState(0);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [URL, setURL] = useState(null);
  const [status, setStatus] = useState(null);

  function handleSubmit() {
    const request = {
      ownerID: localStorage.getItem("userID"),
      ownerName: localStorage.getItem("username"),
      name: name,
      content: content,
      completed: false,
      chocolates: chocolates,
      mints: mints,
      pizzas: pizzas,
      coffees: coffees,
      candies: candies,
    };

    console.log(request);

    const url = "/request/new";
    try {
      axios
        .post(url, { request, authToken: localStorage.getItem("authToken") })
        .then((response) => {
          setStatus(response.status);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    if (status === 200) {
      //setURL("/profile");
    }
  }

  if (URL !== null) {
    return <Redirect to={URL}></Redirect>;
  }


  if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <OperationModal
        status={status}
        show={showModal}
        onHandleClose={() => {
          handleClose();
        }}
      ></OperationModal>
      <h1> Submit a Request</h1>
      <div class="searchRequestForm">
        <Card style={{ width: "18rem" }}>
          <Form onSubmit={handleSubmit} noValidate>
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
              {name.length < 6 && (
              <Form.Text>
                Please enter a request name greater than 6 characters
              </Form.Text>
            )}
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
              {content.length < 6 && (
              <Form.Text>
                Please enter a description greater than 6 characters
              </Form.Text>
            )}
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
              {chocolates < 0 && (
              <Form.Text>
                Please enter a positive or 0 amount of chocolates
              </Form.Text>
              )}
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
              {mints < 0 && (
              <Form.Text>
                Please enter a positive or 0 amount of mints
              </Form.Text>
              )}
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
              {pizzas < 0 && (
              <Form.Text>
                Please enter a positive or 0 amount of pizzas
              </Form.Text>
              )}
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
              {coffees < 0 && (
              <Form.Text>
                Please enter a positive or 0 amount of coffees
              </Form.Text>
              )}
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
              {candies < 0 && (
              <Form.Text>
                Please enter a positive or 0 amount of candies
              </Form.Text>
              )}
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default NewRequests;
