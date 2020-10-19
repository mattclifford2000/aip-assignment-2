import React, { Component, useState, useEffect } from 'react';
import axios from "axios"; import ReactDOM, { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import { Card, Button, Spinner } from "react-bootstrap";

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
  const handleDelete = (e) => {
    //e.preventDefault();
    console.log(localStorage.getItem('userID'));

    axios
      .post("/request/delete", {
        requestID: e._id,
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
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{request.requestname}</Card.Title>
        <Card.Text>
          {request.requestcontent}
        </Card.Text>

        {(localStorage.getItem('userID') === request.ownerID) ?

          <Button onClick={handleDelete(request)} variant="danger">Delete</Button> : ""}
      </Card.Body>
    </Card>
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