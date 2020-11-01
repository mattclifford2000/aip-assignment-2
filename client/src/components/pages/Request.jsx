import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlaceholderImage from "../img/placeholder.png";

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


  const handleDelete = (request) => {
    console.log(localStorage.getItem('userID'));

    axios
      .post("/request/delete", {
        requestID: request._id,
        authToken: localStorage.getItem('authToken')
      })
      .then((res) => {
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
          <Card.Img variant="top" className="card-img" style={{ backgroundImage: `url(${PlaceholderImage})` }} />
          <Card.Body>
            <Card.Title> <h2>{request.name}</h2> </Card.Title>
            <Card.Text>
              <p> Requested by: {request.ownerName} </p>
              {request.content}
              <br></br>
              <br></br>
              <h5>Rewards:</h5>
              <span display="inline">
                {request.chocolates !== 0 && request.chocolates !== null &&
                  (
                    <span><FontAwesomeIcon icon="cookie"></FontAwesomeIcon> x{request.chocolates}  </span>
                  )}

                {request.mints !== 0 && request.mints !== null &&
                  (
                    <span><FontAwesomeIcon icon="leaf"></FontAwesomeIcon> x{request.mints}  </span>
                  )}

                {request.pizzas !== 0 && request.pizzas !== null &&
                  (
                    <span><FontAwesomeIcon icon="pizza-slice"></FontAwesomeIcon> x{request.pizzas}  </span>
                  )}

                {request.coffees !== 0 && request.coffees !== null &&
                  (
                    <span><FontAwesomeIcon icon="coffee"></FontAwesomeIcon> x{request.coffees}  </span>
                  )}

                {request.candies !== 0 && request.candies !== null &&
                  (
                    <span><FontAwesomeIcon icon="candy-cane"></FontAwesomeIcon> x{request.candies}  </span>
                  )}
              </span>
            </Card.Text>
          </Card.Body>

          <Card.Footer>
            {localStorage.getItem("userID") !== request.ownerID &&
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