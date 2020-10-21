import React, { Component, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Jumbotron, Row, Button, InputGroup, Form, Col, Dropdown, DropdownButton } from 'react-bootstrap'; 

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchType: "favours",
          searchLabel: "Search for favours",
          query: "",
        }
      }

      handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
      };

      changeSearchType = (type) => {
        this.setState({ searchType: type });
      };

      componentDidMount() {
        let initType = this.props.initType;
        if(initType){
          this.changeSearchType(initType);
        }
      }

    
    render() {
      return(
      <Form>
      <Row>
        <Col md={3} sm={0}></Col>
        <Col md={6} sm={12}>
          <InputGroup className="">
            <Form.Control size="lg" type="text" placeholder="Search for favours" name="query" value={this.state.query} onChange={this.handleInputChange}>
            </Form.Control>
            <InputGroup.Append>
            <DropdownButton alignRight variant="light" size="lg" id="dropdown-basic-button" title={<FontAwesomeIcon icon="sliders-h" />}>
              <Dropdown.Item active={(this.state.searchType === "favours")} onClick={() => {this.changeSearchType("favours")}}>Favours</Dropdown.Item>
              <Dropdown.Item active={(this.state.searchType === "requests")} onClick={() => {this.changeSearchType("requests")}}>Requests</Dropdown.Item>
            </DropdownButton>
            <Button variant="primary" size="lg" href={"/search" + this.state.searchType + "/" + this.state.query}><FontAwesomeIcon icon="search" /> </Button>

            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </Form>
    );
  }
  
  }

  export default SearchBox;