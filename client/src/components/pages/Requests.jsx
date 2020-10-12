import React, { Component } from "react";
import axios from "axios";
import "./../../styles/Request.css";
import { Button, Form, Card } from "react-bootstrap";


class Requests extends Component {
  state = {
    requests: [],


    requestTitle: "",
    cupcakes: "",
    chocolates: "",
    mints: "",
    coffees: "",
    icecreams: "",


    requestTitleError: "",
    rewardError: ""

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


  handleSubmit = (e) => {
    const request = {
      requestTitle: this.state.requestTitle,
      cupcakes: this.state.cupcakes,
      mints: this.state.mints,
      chocolates: this.state.chocolates,
      coffees: this.state.coffees,
      icecreams: this.state.icecreams
    };



    const url = "http://localhost:9000/request";
    axios
      .post(url, request)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.setState({ result: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };






  handleInputChange = (e) => {

    if ((this.state.requestTitle.length + 1) <= 5) {
      this.setState({ requestTitleError: "Your request must be longer than 6 characters" })
    }
    else {
      this.setState({ requestTitleError: "" })
    }


    if ((this.state.chocolates) == "") {
      this.setState({ rewardError: "Your chocolates must be longer than 6 characters" })
    }
    else {
      this.setState({ rewardError: "" })
    }

    this.setState({ [e.target.name]: e.target.value });

  }

  render() {
    return (
      <div>
        <h1> Requests </h1>

        <div className="registerform">
          <Card style={{ width: '18rem' }}>
            <Form onSubmit={this.handleSubmit} noValidate>
              <Form.Group controlId="requestTitle">
                <Form.Label>Request</Form.Label>
                <Form.Control
                  type="text"
                  name="requestTitle"
                  value={this.state.requestTitle}
                  onChange={this.handleInputChange}
                />
              </Form.Group>



              <p> {this.state.requestTitleError} </p>


              <p> {this.state.rewardError} </p>

              <Form.Group controlId="cupcakes">
                <Form.Label>Cupcakes</Form.Label>
                <Form.Control
                  type="number"
                  name="cupcakes"
                  value={this.state.cupcakes}
                  onChange={this.handleInputChange}
                />
              </Form.Group>


              <Form.Group controlId="chocolates">
                <Form.Label>Chocolates</Form.Label>
                <Form.Control
                  type="number"
                  name="chocolates"
                  value={this.state.chocolates}
                  onChange={this.handleInputChange}
                />
              </Form.Group>


              <Form.Group controlId="mints">
                <Form.Label>Mints</Form.Label>
                <Form.Control
                  type="number"
                  name="mints"
                  value={this.state.mints}
                  onChange={this.handleInputChange}
                />
              </Form.Group>


              <Form.Group controlId="coffees">
                <Form.Label>Coffees</Form.Label>
                <Form.Control
                  type="number"
                  name="coffees"
                  value={this.state.coffees}
                  onChange={this.handleInputChange}
                />
              </Form.Group>


              <Form.Group controlId="icecreams">
                <Form.Label>Icecreams</Form.Label>
                <Form.Control
                  type="number"
                  name="icecreams"
                  value={this.state.icecreams}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              {/* Only show submit button if request title is longer than 6 characters AND at least one reward is provided */}

              {this.state.requestTitle.length >= 6 &&
                (this.state.cupcakes.length > 0 ||
                  this.state.chocolates.length > 0 ||
                  this.state.mints.length > 0 ||
                  this.state.coffees.length > 0 ||
                  this.state.icecreams.length > 0) &&
                <Button variant="primary" type="submit">
                  Submit
             </Button>
              }
            </Form>
          </Card>
        </div>



        <ol class="requestList">
          {this.state.requests.map((request) => (
            <li class='request'> <h1> {request.requestTitle} </h1>
              <p>Rewards: </p>


              {/* Only show rewards that are entered. No blank rewards */}
              {request.cupcakes > 0 &&
                (<p> Cupcakes: {request.cupcakes}  </p>)
              }

              {request.chocolates > 0 &&
                (<p> Chocolates: {request.chocolates}  </p>)
              }

              {request.mints > 0 &&
                (<p> Mints: {request.mints}  </p>)
              }

              {request.coffees > 0 &&
                (<p> Coffees: {request.coffees}  </p>)
              }


              {request.icecreams > 0 &&
                (<p> Icecreams: {request.icecreams}  </p>)
              }

            </li>
          ))}
        </ol>
      </div>
    )
  }


}

export default Requests;
