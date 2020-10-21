import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import { Card, Button, Spinner, Form, Col } from "react-bootstrap";
import PlaceholderImage from "../img/placeholder.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RewardCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleAccept = this.handleAccept.bind(this);
        //this.handleDelete = this.handleDelete.bind(this);*/

      }
      handleAccept(e) {
          this.props.onAccept(e);
      }
    /*  handleInputChange(e) {
        this.props.onInputChange(e);
      }

      handleDelete(e){
        this.props.onDelete(e);
      }*/
    
    render() {
      const request = this.props.request;
      if(request != null) {
      return (
        <Col sm={12} md={4} lg={3} className="request-card-container">
        <Card className="request-card">
        <Card.Img variant="top" className="card-img" style={{backgroundImage: `url(${PlaceholderImage})` }}/>
        <Card.Body>
         <Card.Title> <h2>{request.name}</h2> </Card.Title>
        <Card.Text>
        {request.content}
        <br></br>
        <br></br>
        <span display="inline">
        {request.chocolates != 0 && request.chocolates != null &&
          (
          <span><FontAwesomeIcon icon="cookie"></FontAwesomeIcon> x{request.chocolates}  </span>
          )}

        {request.mints != 0 && request.mints != null &&
          (
            <span><FontAwesomeIcon icon="leaf"></FontAwesomeIcon> x{request.mints}  </span>
            )}

        {request.pizzas != 0 && request.pizzas != null &&
          (
            <span><FontAwesomeIcon icon="pizza-slice"></FontAwesomeIcon> x{request.pizzas}  </span>
          )}

        {request.coffees != 0 && request.coffees != null &&
          (
            <span><FontAwesomeIcon icon="coffee"></FontAwesomeIcon> x{request.coffees}  </span>
          )}

        {request.candies != 0 && request.candies != null &&
          (
            <span><FontAwesomeIcon icon="candy-cane"></FontAwesomeIcon> x{request.candies}  </span>
          )}
          </span>
  </Card.Text>
  </Card.Body>

  <Card.Footer>
        {localStorage.getItem("userID") != request.ownerID &&
          (
            <Button onClick={() => this.handleAccept(request)} variant="success">Accept <FontAwesomeIcon icon="check"></FontAwesomeIcon></Button>
          )}
            <Button href={"/request/" + request._id} variant="info">View <FontAwesomeIcon icon="arrow-right"></FontAwesomeIcon></Button>

          </Card.Footer>
          </Card>
      </Col>
            );
    }
    else return null;
  }
  
  }

  export default RewardCard;

