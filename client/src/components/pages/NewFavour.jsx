import React, { Component } from "react"; //eslint-disable-line
import { Button, Form, Card, ButtonGroup, ProgressBar } from "react-bootstrap";
import axios from "axios";
import "../../styles/Register.scss";
import OperationModal from "../shared/OperationModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      chocolates: 0,
      mints: 0,
      pizzas: 0,
      coffees: 0,
      candies: 0,
      status: null,
      showModal: false,
      showErrorModal: false,
      image: null,
      imageURL: null,
      uploadProgress: null,
      url: "/favour/new"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
  }

  handleClose = () => {
    this.setState({
      showModal: false,
      uploadProgress: null
    });
    if (this.state.status === 200) {
      this.setState({ URL: "/profile" })
    }
  };

  handleErrorClose = () => {
    this.setState({ showErrorModal: false })
  }

  handleSubmit = async (e) => {
    if (this.state.owed && this.state.image === null) {
      console.log("You need an image");
      this.setState({
        showErrorModal: true
      })
    } else {
      const config = {
        onUploadProgress: progressEvent => {
          var completed = Math.round((progressEvent.loaded * 100) / progressEvent.total) * 0.9;
          this.setState({
            uploadProgress: completed
          })
        }
      }

      if (this.state.image !== null) {
        const imgUploadURL = 'https://api.cloudinary.com/v1_1/dj31q081c/image/upload';
        const imgPreset = 'w58gpgxt';
        const formData = new FormData();
        formData.append('file', this.state.image);
        formData.append('upload_preset', imgPreset);
        try {
          const res = await axios.post(imgUploadURL, formData, config);
          this.setState({
            imageURL: res.data.secure_url
          })
        } catch (err) {
          this.state.imageURL = "https://res.cloudinary.com/dj31q081c/image/upload/v1603411404/h1ev27jysc1vkbuicvyq.jpg"
          console.error(err);
        }
        console.log(this.state.imageURL);
      }

      const favour = {
        token: localStorage.getItem("authToken"),
        externalemail: this.state.externalemail,
        myname: localStorage.getItem("username"),
        owed: this.state.owed,
        name: this.state.name,
        content: this.state.content,
        completed: this.state.completed,
        chocolates: this.state.chocolates,
        mints: this.state.mints,
        pizzas: this.state.pizzas,
        coffees: this.state.coffees,
        candies: this.state.candies,
        imageURL: this.state.imageURL
      };

      await axios
        .post(this.state.url, favour)
        .then((response) => {
          this.setState({
            status: response.status,
            showModal: true,
          })
        })
        .catch((error) => {
          this.setState({
            status: error,
            showModal: true,
          })
          console.error(error);
        });
      this.setState({
        uploadProgress: 100
      });
    }
  };

  onChangeImg(e) {
    this.setState({ image: e.target.files[0] });
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


  handleInputChange = (e) => {
    e.preventDefault();
    console.log(e);

    const { name } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "owebutton":
        this.setState({ owed: false });
        break;
      case "owedbutton":
        this.setState({ owed: true });
        break;
      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  externalUserLabel() {

    return (this.state.owed ? "Email of user who owes you" : "Email of user you owe");
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && email.length > 6;
  }

  render() {

    return (
      <div className="registerform" id="registerform">
        <Card style={{ width: "18rem" }}>
          <Card.Header>New Favour</Card.Header>
          <Form noValidate>
            <ButtonGroup aria-label="Favour Choice">

              <Button
                name="owebutton"
                variant="info"
                onClick={this.handleInputChange}
                id="oweButton"
              >I owe</Button>
              <Button
                name="owedbutton"
                variant="info"
                onClick={this.handleInputChange}
                id="oweButton"
              >I am owed</Button>
            </ButtonGroup>
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
              {!this.validateEmail(this.state.externalemail) && (
                <Form.Text>Please enter a valid email</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Favour Name</Form.Label>
              <Form.Control
                type="string"
                name="name"
                placeholder="Enter favour name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              {this.state.name.length < 3 && (
                <Form.Text>
                  Please enter a favour name greater than 3 characters
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Favour Description</Form.Label>
              <Form.Control
                type="string"
                name="content"
                placeholder="Enter a description of the favour"
                value={this.state.content}
                onChange={this.handleInputChange}
              />
              {this.state.content.length < 3 && (
                <Form.Text>
                  Please enter a favour description greater than 3 characters
                </Form.Text>
              )}
              <br></br>

              <h3> Rewards: </h3>
              <Form.Group controlId="chocolates">
                <Form.Label><span><FontAwesomeIcon icon="cookie"></FontAwesomeIcon> Chocolates  </span> </Form.Label>
                <Form.Control
                  name="chocolates"
                  type="number"
                  placeholder={this.state.chocolates}
                  value={this.state.chocolates}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="mints">
                <Form.Label><span><FontAwesomeIcon icon="leaf"></FontAwesomeIcon> Mints  </span></Form.Label>
                <Form.Control
                  name="mints"
                  type="number"
                  placeholder={this.state.mints}
                  value={this.state.mints}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="pizzas">
                <Form.Label><span><FontAwesomeIcon icon="pizza-slice"></FontAwesomeIcon> Pizzas  </span></Form.Label>
                <Form.Control
                  name="pizzas"
                  type="number"
                  placeholder={this.state.pizzas}
                  value={this.state.pizzas}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="coffees">
                <Form.Label><span><FontAwesomeIcon icon="coffee"></FontAwesomeIcon> Coffees  </span></Form.Label>
                <Form.Control
                  name="coffees"
                  type="number"
                  placeholder={this.state.coffees}
                  value={this.state.coffees}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="candies">
                <Form.Label> <span><FontAwesomeIcon icon="candy-cane"></FontAwesomeIcon> Candies  </span></Form.Label>
                <Form.Control
                  name="candies"
                  type="number"
                  placeholder={this.state.candies}
                  value={this.state.candies}
                  onChange={this.handleInputChange}
                />
              </Form.Group>


              <h3> Image: </h3>
              <Form.Group>
                <input type="file" name="myImage" onChange={this.onChangeImg} />
              </Form.Group>
              <Form.Group>
                {this.state.name.length >= 3 &&
                  this.state.content.length >= 3 &&
                  this.validateEmail(this.state.externalemail) &&
                  (
                    <Button variant="primary" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  )}
                {(this.state.uploadProgress !== null) &&
                  <div>
                    <br></br>
                    <ProgressBar variant="info" animated now={this.state.uploadProgress} />
                    <p>Currently uploading image and favour</p>
                  </div>
                }
              </Form.Group>
            </Form.Group>
          </Form>
        </Card>


        <OperationModal status={this.state.status} show={this.state.showModal} onHandleClose={this.handleClose}></OperationModal>
        <OperationModal status={this.state.status} show={this.state.showErrorModal} onHandleClose={this.handleErrorClose}></OperationModal>
      </div>
    );
  }
}

