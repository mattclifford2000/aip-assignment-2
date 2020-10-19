import React, { Component, useState } from "react"; //eslint-disable-line
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Register.css";
import NewReward from "../shared/NewReward"
import OperationModal from "../shared/OperationModal"

import { isValidElement } from "react";

export default class NewFavourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      externalemail: "",
      owed: false,
      name: "",
      content: "",
      completed: false,
      rewards: Array(),
      errors: {
        favourname: "",
        favourcontent: "",
        favourcompleted: "",
      },
      status: null,
      showModal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClose = () => this.setState({showModal: false})

   handleSubmit = async (e) => {
    let validRewards = [];
    for (const reward of this.state.rewards){
      if(reward != null) validRewards = validRewards.concat(reward)
    }
    
    const favour = {
      token: localStorage.getItem("authToken"),
      externalemail: this.state.externalemail,
      owed: this.state.owed,
      name: this.state.name,
      content: this.state.content,
      completed: this.state.completed,
      rewards: validRewards,
    };

    const url = "http://localhost:9000/favour/new";

    await axios
      .post(url, favour)
      .then((response) => {
        //console.log(response.status);
        this.setState({status: response.status,
          showModal: true,
        })

      })
      .catch((error) => {
        console.error(error);
      });
  };

  
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

  handleRewardDelete = (e) => {
    console.log(e.target);
    const { id } = e.target;
    let updatedRewards = this.state.rewards;
    updatedRewards[id] = null;
    this.setState({
      rewards: updatedRewards
    })
  }


  handleInputChange = (e) => {
    e.preventDefault();
    console.log(e);

    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "name":
        errors.favourname =
          value.length < 3 || value.length > 1024
            ? "Your favour name must be 3 characters or longer."
            : "";
        break;
      case "content":
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
        <OperationModal status={this.state.status} show={this.state.showModal} onHandleClose={this.handleClose}></OperationModal>
        <Card style={{ width: "18rem" }}>
          <Form noValidate>
            <ButtonGroup aria-label="Favour Choice">
              <Button 
              name="owebutton"
              variant="info"
              onClick={this.handleInputChange}
              >I owe</Button>
              <Button 
              name="owedbutton"
              variant="info"
              onClick={this.handleInputChange}
              >I am owed</Button>            </ButtonGroup>
            <Form.Group controlId="token">
              <Form.Control
                type="hidden"
                name="token"
                value={localStorage.getItem("authToken")}
              />
            </Form.Group>
            <Form.Group controlId="completed">
              <Form.Control
                type="hidden"
                name="completed"
                value={false}
              />
            </Form.Group>
            <Form.Group controlId="externalemail">
            <Form.Label>{this.externalUserLabel()}</Form.Label>
              <Form.Control
                type="email"
                name="externalemail"
                placeholder="Enter email"
                value={this.state.externalemail}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Favour Name</Form.Label>
              <Form.Control
                type="string"
                name="name"
                placeholder="Enter favour name"
                value={this.state.favourname}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.favourname} </p>
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Favour Description</Form.Label>
              <Form.Control
                type="string"
                name="content"
                placeholder="Enter a description of the favour"
                value={this.state.favourcontent}
                onChange={this.handleInputChange}
              />
              <p> {this.state.errors.favourcontent} </p>
            </Form.Group>
            {
              this.state.rewards.map((data) => (
                <NewReward data={data} onInputChange={this.handleRewardInputChange} onDelete={this.handleRewardDelete}></NewReward>
                ))
              }
            <Form.Group>
            <Button 
              name="addreward"
              variant="success"
              onClick={this.addReward}
              >+ Add a reward</Button>
            </Form.Group>
            
            <Form.Group>

            {this.state.name.length >= 3 &&
              this.state.content.length >= 3 && (
                
                <Button variant="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>

              )}
            </Form.Group>

          </Form>
        </Card>
      </div>
    );
  }
}

