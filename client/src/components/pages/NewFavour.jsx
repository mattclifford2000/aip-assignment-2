import React, { Component, useState } from "react"; //eslint-disable-line
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Register.css";
import NewReward from "../shared/NewReward"
import { isValidElement } from "react";

export default class NewFavourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      externalemail: "",
      owed: false,
      favourname: "",
      favourcontent: "",
      favourcompleted: false,
      rewards: Array(),
      rewardIDs: Array(),
      errors: {
        favourname: "",
        favourcontent: "",
        favourcompleted: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

   handleSubmit = async (e) => {
    e.preventDefault();
    let promise = new Promise ((resolve, reject) => {
      let complete = false;
      complete = this.submitRewards();
      while(!complete){};
      if(complete){resolve("done")}
    })
    this.submitFavour(promise)
    //this.submitRewards().then(this.submitFavour());
    //const rewardIDs = await this.submitRewards();
    //const favourIDs = await setTimeout(this.submitFavour(rewardIDs), 10000);
    //this.submitFavour(rewardIDs)
    //this.submitRewards(this.submitFavour);
  };

  async submitRewards() {
    //let ids = Array();
    const url = "http://localhost:9000/reward/new";
    this.state.rewards.map((reward) => {
       axios
      .post(url, reward)
      .then((response) => {
       this.setState({
        rewards: this.state.rewardIDs.concat(response.data._id)
      })
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    });
    return true;
  }

  async submitFavour (promise) {
      const favour = {
        token: localStorage.getItem("authToken"),
        externalemail: this.state.externalemail,
        owed: this.state.owed,
        favourname: this.state.favourname,
        favourcontent: this.state.favourcontent,
        favourcompleted: this.state.favourcompleted,
        favourrewards: this.state.rewardIDs,
      };
      console.log("local favour");
      console.log(favour);
      console.log(this.state.rewardIDs);
      const url = "http://localhost:9000/favour/new";
  
      axios
        .post(url, favour)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.setState({ result: response.data });
        })
        .catch((error) => {
          console.error(error);
        });
        promise = promise + 1;
  }
  

  addReward = (e) => {
    const reward = {
      key: this.state.rewards.length,
      name: "",
      content: "",
    }
    this.setState({
      rewards: this.state.rewards.concat(reward)
    });
  }

 //ROUGH IMPLEMENTATION PASSING REWARD KEY THROUGH EVENT ID, IMPROVE 
  handleRewardInputChange = (e) => {    
    const { name, value, id } = e.target;
    switch(name){
      case "name":
      this.state.rewards[id].name = value;
      break;
      case "content":
      this.state.rewards[id].content = value;
      break;
      default:
      break;
    };
    this.setState({
      rewards: this.state.rewards
    });
  };


  handleInputChange = (e) => {
    e.preventDefault();
    console.log(e);

    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "favourname":
        errors.favourname =
          value.length < 3 || value.length > 1024
            ? "Your favour name must be 3 characters or longer."
            : "";
        break;
      case "favourcontent":
        errors.favourcontent =
          value.length < 3 || value.length > 1024
            ? "Your favour description must be 3 characters or longer."
            : "";
        break;
        case "owebutton":
        this.setState({owed : false});
        break;
        case "owedbutton":
        this.setState({owed : true});
        break;
      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  externalUserLabel() {
    return(this.state.owed ? "Email of user who owes you" : "Email of user you owe");
  } 

  render() {
    return (
      <div className="registerform">
        {/*Reuse RegisterForm styling for now*/}
        <Card style={{ width: "18rem" }}>
          <Form onSubmit={this.handleSubmit} noValidate>
            <ButtonGroup aria-label="Favour Choice">
              <Button 
              name="owebutton"
              variant="primary"
              onClick={this.handleInputChange}
              >I owe</Button>
              <Button 
              name="owedbutton"
              variant="primary"
              onClick={this.handleInputChange}
              >I am owed</Button>            </ButtonGroup>
            <Form.Group controlId="token">
              <Form.Control
                type="hidden"
                name="token"
                value={localStorage.getItem("authToken")}
              />
            </Form.Group>
            <Form.Group controlId="favourcompleted">
              <Form.Control
                type="hidden"
                name="favourcompleted"
                value={false}
              />
            </Form.Group>
            <Form.Group controlId="token">
    <Form.Label>{this.externalUserLabel()}</Form.Label>
              <Form.Control
                type="email"
                name="externalemail"
                placeholder="Enter email"
                value={this.state.externalemail}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="favourname">
              <Form.Label>Favour Name</Form.Label>
              <Form.Control
                type="string"
                name="favourname"
                placeholder="Enter favour name"
                value={this.state.favourname}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.favourname} </p>
            </Form.Group>
            <Form.Group controlId="favourcontent">
              <Form.Label>Favour Description</Form.Label>
              <Form.Control
                type="string"
                name="favourcontent"
                placeholder="Enter a description of the favour"
                value={this.state.favourcontent}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.favourcontent} </p>
            </Form.Group>
            <Form.Group>

            </Form.Group>
            {this.state.favourname.length >= 3 &&
              this.state.favourcontent.length >= 3 && (
                
                <Button variant="primary" type="submit">
                  Submit
                </Button>

              )}
          </Form>
          <Button 
              name="addreward"
              variant="success"
              onClick={this.addReward}
              >+ Add a reward</Button>
            {/*<NewReward onInputChange={this.handleRewardInputChange} onSubmit={this.handleSubmit}></NewReward>*/}
            {
              this.state.rewards.map((data) => (
                <NewReward data={data} onInputChange={this.handleRewardInputChange} onSubmit={this.handleSubmit}></NewReward>
                ))
              }
        </Card>
      </div>
    );
  }
}

