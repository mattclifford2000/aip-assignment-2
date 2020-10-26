import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Form } from "react-bootstrap";
import PlaceholderImage from "../img/placeholder.png";
import axios from "axios";

class RewardCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
    this.state = {
      uploaded: false,
      image: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    //this.handleDelete = this.handleDelete.bind(this);*/

  }
  handleComplete(e) {
    this.props.onAccept(e);
  }
  /*  handleInputChange(e) {
      this.props.onInputChange(e);
    }
*/
  /*
      handleDelete(favour){
        this.props.onDelete(favour);
      }
  */

  handleSubmit = async (favour) => {
    if (this.state.image !== null) {
      const imgUploadURL = 'https://api.cloudinary.com/v1_1/dj31q081c/image/upload';
      const imgPreset = 'w58gpgxt';
      const formData = new FormData();
      formData.append('file', this.state.image);
      formData.append('upload_preset', imgPreset);
      try {
        const res = await axios.post(imgUploadURL, formData);
        favour.imageURL = res.data.secure_url;
      } catch (err) {
        favour.imageURL = "https://res.cloudinary.com/dj31q081c/image/upload/v1603411404/h1ev27jysc1vkbuicvyq.jpg"
        console.error(err);
      }
      console.log(favour.imageURL);
    }

    const url = "/favour/addImg";
    await axios
      .post(url, favour)
      .then((response) => {
        console.log("client success upload");
      })
      .catch((error) => {

        console.error(error);
      });
    this.setState({ uploaded: true })
  }

  onChangeImg(e) {
    this.setState({ image: e.target.files[0] });
  }


  render() {
    const favour = this.props.favour;
    let imageURL = PlaceholderImage;
    if (favour.imageURL) {
      imageURL = favour.imageURL;
    };

    let cardFooterAccept = <p></p>;
    if (favour !== null) {
      return (
        <Col sm={12} md={4} lg={3} className="request-card-container">
          <Card className="request-card">
            <Card.Img variant="top" className="card-img" style={{ backgroundImage: `url(${imageURL})` }} />
            <Card.Body>
              <Card.Title> <h2>{favour.name}</h2> </Card.Title>
              <Card.Text>
                <p> {favour.content} </p>
                <p> Owes you: {favour.creditorName} </p>
                <br></br>
                <br></br>
                <span display="inline">
                  {favour.chocolates !== 0 && favour.chocolates !== null &&
                    (
                      <span><FontAwesomeIcon icon="cookie"></FontAwesomeIcon> x{favour.chocolates}  </span>
                    )}

                  {favour.mints !== 0 && favour.mints !== null &&
                    (
                      <span><FontAwesomeIcon icon="leaf"></FontAwesomeIcon> x{favour.mints}  </span>
                    )}

                  {favour.pizzas !== 0 && favour.pizzas !== null &&
                    (
                      <span><FontAwesomeIcon icon="pizza-slice"></FontAwesomeIcon> x{favour.pizzas}  </span>
                    )}

                  {favour.coffees !== 0 && favour.coffees !== null &&
                    (
                      <span><FontAwesomeIcon icon="coffee"></FontAwesomeIcon> x{favour.coffees}  </span>
                    )}

                  {favour.candies !== 0 && favour.candies !== null &&
                    (
                      <span><FontAwesomeIcon icon="candy-cane"></FontAwesomeIcon> x{favour.candies}  </span>
                    )}
                </span>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {cardFooterAccept}

              {/* <Button href={"/favour/" + favour._id} variant="info">View <FontAwesomeIcon icon="arrow-right"></FontAwesomeIcon></Button> */}
              <Form>

                <input type="file" name="myImage" onChange={this.onChangeImg} />

                {this.state.image !== null &&
                  (

                    <Button onClick={() => { this.handleSubmit(favour); this.handleComplete(favour) }} variant="primary">Complete <FontAwesomeIcon icon="check"></FontAwesomeIcon></Button>

                  )}


              </Form>


            </Card.Footer>

          </Card>
        </Col>
      );
    }
    else return null;
  }

}

export default RewardCard;

