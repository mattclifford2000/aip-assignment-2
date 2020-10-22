import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlaceholderImage from "../img/placeholder.png";

function Favour(props) {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [favour, setFavour] = useState();

  useEffect(() => {
    axios.get("/favour/favour?id=" + id).then(res => {
      setFavour(res.data);
      setLoading(false);
    });
  }, []);

  //DUPLICATE OF PROFILE CODE, TIDY UP
  const handleDelete = (request) => {
    //e.preventDefault();
    console.log(localStorage.getItem('userID'));

    axios
      .post("/favour/delete", {
        requestID: favour._id,
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

  let imageURL = PlaceholderImage;
  if(favour.imageURL){
    imageURL = favour.imageURL;
  };

  return (
    <Row className="singlerequest">
    <Col md={2} sm={0} lg={2}></Col>
    <Col md={8} sm={12} lg={8}>
    <Card className="request-card">
        <Card.Img variant="top" className="large-img" style={{backgroundImage: `url(${imageURL})` }}/>
        <Card.Body>
         <Card.Title> <h2>{favour.name}</h2> </Card.Title>
        <Card.Text>
        {favour.content}
        <br></br>
        <br></br>
        <h5>Rewards:</h5>
        <span display="inline">
        {favour.chocolates != 0 && favour.chocolates != null &&
          (
          <span><FontAwesomeIcon icon="cookie"></FontAwesomeIcon> x{favour.chocolates}  </span>
          )}

        {favour.mints != 0 && favour.mints != null &&
          (
            <span><FontAwesomeIcon icon="leaf"></FontAwesomeIcon> x{favour.mints}  </span>
            )}

        {favour.pizzas != 0 && favour.pizzas != null &&
          (
            <span><FontAwesomeIcon icon="pizza-slice"></FontAwesomeIcon> x{favour.pizzas}  </span>
          )}

        {favour.coffees != 0 && favour.coffees != null &&
          (
            <span><FontAwesomeIcon icon="coffee"></FontAwesomeIcon> x{favour.coffees}  </span>
          )}

        {favour.candies != 0 && favour.candies != null &&
          (
            <span><FontAwesomeIcon icon="candy-cane"></FontAwesomeIcon> x{favour.candies}  </span>
          )}
          </span>
  </Card.Text>
  </Card.Body>

  <Card.Footer>
        {localStorage.getItem("userID") != favour.ownerID &&
          (
            <Button onClick={() => this.handleAccept(favour)} variant="success">Accept <FontAwesomeIcon icon="check"></FontAwesomeIcon></Button>
          )}


            {(localStorage.getItem('userID') === favour.ownerID) ?

              <Button onClick={() => handleDelete(favour)} variant="danger">Delete</Button> : ""}

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
        <Route path="/favour/:id" children={<Favour />} />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);