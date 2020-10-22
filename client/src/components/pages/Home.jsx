import React from "react";
import Leaderboard from "../shared/Leaderboard";
import "./../../styles/Home.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Jumbotron, Row, Button, InputGroup, Form, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import Requests from "./Requests";
import SearchBox from "../shared/SearchBox";



function Home(props) {

  return (
    <div>
      <Jumbotron fluid className="showcase">
        <h1 className="text-center"><FontAwesomeIcon icon="stroopwafel" /> Favour Centre</h1>
        <br></br>
        <SearchBox></SearchBox>
      </Jumbotron>
      <Requests></Requests>
    </div>
  );
}

export default Home;

