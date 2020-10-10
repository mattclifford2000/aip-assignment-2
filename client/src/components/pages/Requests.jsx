import React, { Component } from "react";
import axios from "axios";
import "./../../styles/Request.css";

class Requests extends Component {
  state = {
    requests: []
  };


  /* todo
  - add "requested by" field
  - do not display rewards with 0 
  -  better formatting + styling
  */

  componentDidMount() {
    axios.get("/request").then((res) => {
      var users = res.data;
      var data = [];
      var i = 0
      while (i < res.data.length) {
        data.push(users[i]);
        i++
      }
      this.setState({ requests: data });
    });
  }


  render() {
    return (
      <div>
        <h1> Requests </h1>
        <ol class="requestList">
          {this.state.requests.map((request) => (
            <li class='request'> <h1> {request.requestTitle} </h1>
              <p>Rewards: </p>
              <p> Cupcakes: {request.requestContent.cupcakes}  </p>
              <p> Muffins: {request.requestContent.muffins}  </p>
              <p> Mints: {request.requestContent.mints}  </p>
              <p> Coffees: {request.requestContent.coffees}  </p>
              <p> Chocolates: {request.requestContent.chocolates}  </p>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Requests;
