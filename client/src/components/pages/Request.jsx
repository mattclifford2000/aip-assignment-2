import React, { Component, useState, useEffect } from 'react';
import axios from "axios"; import ReactDOM, { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import { Card, Button, Spinner, Col, Row } from "react-bootstrap";
import PlaceholderImage from "../img/placeholder.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Request(props) {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [request, setRequest] = useState();

  useEffect(() => {
    axios.get("/request/request?id=" + id).then(res => {
      setRequest(res.data);
      setLoading(false);
    });
  }, []);

  //DUPLICATE OF PROFILE CODE, TIDY UP
  const handleDelete = (request) => {
    //e.preventDefault();
    console.log(localStorage.getItem('userID'));

    axios
      .post("/request/delete", {
        requestID: request._id,
        authToken: localStorage.getItem('authToken')
      })
      .then((res) => {
        //setRequests(res.data);
      });
  }

  if (isLoading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>;
  }

  return (
    <Row className="singlerequest">
    <Col md={2} sm={0} lg={2}></Col>
    <Col md={8} sm={12} lg={8}>
    <Card className="request-card">
        <Card.Img variant="top" className="card-img" style={{backgroundImage: `url(${PlaceholderImage})` }}/>
        <Card.Body>
         <Card.Title> <h2>{request.name}</h2> </Card.Title>
        <Card.Text>
        {request.content}
        <br></br>
        <br></br>
        <span display="inline">
        {request.chocolates != 0 && request.chocolates != null &&
          (
          <span><FontAwesomeIcon icon="cookie"></FontAwesomeIcon> x{request.chocolates}  </span>
          )}

        {request.mints != 0 && request.mints != null &&
          (
            <span><FontAwesomeIcon icon="leaf"></FontAwesomeIcon> x{request.mints}  </span>
            )}

        {request.pizzas != 0 && request.pizzas != null &&
          (
            <span><FontAwesomeIcon icon="pizza-slice"></FontAwesomeIcon> x{request.pizzas}  </span>
          )}

        {request.coffees != 0 && request.coffees != null &&
          (
            <span><FontAwesomeIcon icon="coffee"></FontAwesomeIcon> x{request.coffees}  </span>
          )}

        {request.candies != 0 && request.candies != null &&
          (
            <span><FontAwesomeIcon icon="candy-cane"></FontAwesomeIcon> x{request.candies}  </span>
          )}
          </span>
  </Card.Text>
  </Card.Body>

  <Card.Footer>
        {localStorage.getItem("userID") != request.ownerID &&
          (
            <Button onClick={() => this.handleAccept(request)} variant="success">Accept <FontAwesomeIcon icon="check"></FontAwesomeIcon></Button>
          )}
            {(localStorage.getItem('userID') === request.ownerID) ?

<Button onClick={() => handleDelete(request)} variant="danger">Delete</Button> : ""}
          </Card.Footer>
          </Card>
          </Col>
</Row>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/request/:id" children={<Request />} />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);