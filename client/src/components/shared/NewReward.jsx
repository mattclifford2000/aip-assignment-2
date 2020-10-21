import React from 'react';
import { Button, Card, Form } from "react-bootstrap";

class NewReward extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

      }

      handleInputChange(e) {
        this.props.onInputChange(e);
      }

      handleDelete(e){
        this.props.onDelete(e);
      }
    
    render() {
      const data = this.props.data;
      if(data != null) {
      return (
        <Card style={{ width: "auto", margin: "10px" }}>
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
            <Form.Group><Button variant="danger" id={data.key} onClick={this.handleDelete}>
                  Delete Reward
                </Button></Form.Group>

            
            </Card>      
            );
    }
    else return null;
  }
  
  }

  export default NewReward;