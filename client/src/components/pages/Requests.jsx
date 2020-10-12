import React, { Component } from "react";
import axios from "axios";
import "./../../styles/Request.css";
import { Button, Form, Card } from "react-bootstrap";

class Requests extends Component {
  state = {
    requests: [],
  };

  componentDidMount() {
    axios.get("/request").then((res) => {
      var users = res.data;
      var data = [];
      var i = 0;
      while (i < res.data.length) {
        data.push(users[i]);
        i++;
      }
      this.setState({ requests: data });
      //this.setState({ requests:  });
    });
  }

  render() {
    return (
      <div>
        <h1> Requests </h1>
        <ol class="requestList">
          {this.state.requests.map((request) => (
            <li class="request">
              <h1> {request.requestname} </h1>
              <p>Request Description: {request.requestcontent}</p>
              <p>Request ID (TESTING): {request._id}</p>
              <p>Request userID (TESTING): {request.ownerID}</p>

              {/* Only show rewards that are entered. No blank rewards */}
              {/*See whether we want static items, or stored in an array in the future? */}
              {/*
              {request.cupcakes > 0 && <p> Cupcakes: {request.cupcakes} </p>}
              {request.chocolates > 0 && (
                <p> Chocolates: {request.chocolates} </p>
              )}
              {request.mints > 0 && <p> Mints: {request.mints} </p>}
              {request.coffees > 0 && <p> Coffees: {request.coffees} </p>}
              {request.icecreams > 0 && <p> Icecreams: {request.icecreams} </p>}
              */}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Requests;
