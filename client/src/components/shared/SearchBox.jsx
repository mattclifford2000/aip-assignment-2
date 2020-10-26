import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Button, InputGroup, Form, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "requests",
      searchLabel: "Search for requests by name, description or rewards",
      query: "",
      redirectURL: null,
    }
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    /*
    let URL = "/search" + this.state.searchType + "/" + this.state.query;
    this.setState({
      redirectURL: URL
    })*/
  }

  changeSearchType = (type) => {
    let label;
    if (type === "favours") {
      label = "Search for favours"
    }
    if (type === "requests") {
      label = "Search for requests"
    }
    this.setState({
      searchType: type,
      searchLabel: label
    });
  };

  componentDidMount() {
    let initType = this.props.initType;
    if (initType) {
      this.changeSearchType(initType);
    }
  }


  render() {
    if (this.state.redirectURL != null) {
      return (
        <Redirect to={this.state.redirectURL} />

      )
    }
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Row>
          <Col md={3} sm={0}></Col>
          <Col md={6} sm={12}>
            <InputGroup className="">
              <Form.Control size="lg" type="text" placeholder={this.state.searchLabel} name="query" value={this.state.query} onChange={this.handleInputChange}>
              </Form.Control>
              <InputGroup.Append>
                <DropdownButton alignRight variant="light" size="lg" id="dropdown-basic-button" title={<FontAwesomeIcon icon="sliders-h" />}>
                  <Dropdown.Item active={(this.state.searchType === "requests")} onClick={() => { this.changeSearchType("requests") }}>Requests</Dropdown.Item>
                  {/* <Dropdown.Item active={(this.state.searchType === "favours")} onClick={() => { this.changeSearchType("favours") }} disabled>Favours (Not Available)</Dropdown.Item>*/}

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