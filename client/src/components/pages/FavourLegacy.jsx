import React, { Component, useState, useEffect } from 'react';
import axios from "axios";import ReactDOM, { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import { Card, Button, Spinner } from "react-bootstrap";

function Favour(props) {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [favour, setFavour] = useState();
  const [rewards, setRewards] = useState();

  useEffect(() => {
    axios.get("/favour/favour?id="+id).then(res => {
      setFavour(res.data.favour);
      //console.log(res.data.rewards);
      setRewards(res.data.rewards);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>;
  }

  return (
    <Card width="50%">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
      <Card.Title>{favour.name}</Card.Title>
        <Card.Text>
          {favour.content}
        </Card.Text>
        {
            rewards.map((reward) => (    
                <Card>
                    <Card.Title>Reward: {reward.name}</Card.Title>
                    <Card.Text>Description: {reward.content}</Card.Text>

                </Card>
            ))
        }
      </Card.Body>
    </Card>
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