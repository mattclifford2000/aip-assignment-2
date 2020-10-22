import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col } from "react-bootstrap";
import PlaceholderImage from "../img/placeholder.png";

class RewardCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }
  handleAccept(e) {
    this.props.onAccept(e);
  }
    handleInputChange(e) {
      this.props.onInputChange(e);
    }

    handleDelete(request){
      this.props.onDelete(request);
    }


  render() {
    const request = this.props.request;
    let cardFooterAccept = <p></p>;

    if (localStorage.getItem("userID") != request.ownerID && localStorage.getItem("loggedIn") == "true") {
      cardFooterAccept = <Button onClick={() => this.handleAccept(request)} variant="success">Accept <FontAwesomeIcon icon="check"></FontAwesomeIcon></Button>;
    }
    if (request != null) {
      return (
        <Col sm={12} md={4} lg={3} className="request-card-container">
          <Card className="request-card">
            <Card.Img variant="top" className="card-img" style={{ backgroundImage: `url(${PlaceholderImage})` }} />
            <Card.Body>
              <Card.Title> <h2>{request.name}</h2> </Card.Title>
              <Card.Text>
                <p> {request.content} </p>
                <p> Requested by: {request.ownerName} </p>
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
              {cardFooterAccept}
              <Button href={"/request/" + request._id} variant="info">View <FontAwesomeIcon icon="arrow-right"></FontAwesomeIcon></Button>
              {(request.ownerID === localStorage.getItem("userID")) &&
              <Button onClick={() => {this.handleDelete(request)}} variant="danger"> Delete</Button>
}
            </Card.Footer>
          </Card>
        </Col>
      );
    }
    else return null;
  }

}

export default RewardCard;

