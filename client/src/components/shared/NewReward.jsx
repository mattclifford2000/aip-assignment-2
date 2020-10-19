import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import { Card, Button, Spinner, Form } from "react-bootstrap";

class NewReward extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            id: "",
            name: "",
            content: "",
            isLoading: false,
            submitted: false,
        };*/
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      handleInputChange(e) {
        this.props.onInputChange(e);
      }

      handleSubmit(e){
        this.props.onSubmit(e);
      }
    /*
      handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault();
    
        const reward = {
          name: this.state.name,
          content: this.state.content,
        };
    
        const url = "http://localhost:9000/reward/new";
        
        this.isLoading = true;

        axios
          .post(url, reward)
          .then((response) => {
            this.setState({ id: response.data._id});
            this.isLoading = false;
            this.submitted = true;
          })
          .catch((error) => {
            console.error(error);
          });
      };*/

    /*
    handleInputChange = (e) => {    
        const { name, value } = e.target;
        this.setState({ [e.target.name]: e.target.value });
    }; */
    
    render() {
      //const name = this.props.reward.name;
      //const content = this.props.reward.content;
      const data = this.props.data;
      return (
        <Card style={{ width: "100%" }}>
            <Form.Group controlId={data.key}>
            <Form.Label>Reward Name</Form.Label>
              <Form.Control
                type="string"
                name="name"
                value={data.name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId={data.key}>
            <Form.Label>Reward Content</Form.Label>
              <Form.Control
                type="string"
                name="content"
                value={data.content}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button variant="info" onClick={this.handleSubmit}>
                  Confirm Reward
                </Button>
            </Card>      
            );
    }
  }

  export default NewReward;