import React, { useState } from "react";
import { AuthContext } from "./components/context/auth";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Leaderboard from "./components/shared/Leaderboard";
import SearchRequests from "./components/pages/SearchRequests";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Register from "./components/pages/Register";
import NewFavour from "./components/pages/NewFavour";
import Request from "./components/pages/Request";
import NewRequest from "./components/pages/NewRequest";
import Favour from "./components/pages/Favour";
import Requests from "./components/pages/Requests";
import Profile from "./components/pages/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import "./styles/Navbar.scss";
import "./App.scss";


//Font Awesome Initialisation
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faSearch, faSlidersH, faPizzaSlice, faCookie, faCoffee, faCandyCane, faLeaf, faArrowRight, faCheck, faKey, faAt, faUser, faCalendar, faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel, faSearch, faSlidersH, faPizzaSlice, faCookie, faCoffee, faCandyCane, faLeaf, faArrowRight, faCheck, faKey, faAt, faUser, faCalendar, faTimes);

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="App" max-width="100%">

          {/*Navbar when user is not logged in*/}
          {(localStorage.getItem('loggedIn') === "false" || localStorage.getItem('loggedIn') === null) &&
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/">Favour Centre</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <NavDropdown title="Requests" id="requests-dropdown">
                    <NavDropdown.Item href="/searchrequests">Search Requests</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/leaderboard" class="navbarText">Leaderboard</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          }

          {/*Navbar when user is logged in*/}
          {localStorage.getItem('loggedIn') === "true" &&
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/">Favour Centre</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <NavDropdown title="Requests" id="requests-dropdown">
                    <NavDropdown.Item href="/newrequest">New Request</NavDropdown.Item>
                    <NavDropdown.Item href="/searchrequests">Search Requests</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Favours" id="requests-dropdown">
                    <NavDropdown.Item href="/newfavour">New Favour</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/profile">{localStorage.getItem('username')}</Nav.Link>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          }

          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          {/* //there is a bug here in the code, when commented the two
           lines below out, the GET /request stops */}
          <Route exact path="/requests" component={Requests} />
          <Route exact path="/" component={Home} />
          <Route exact path="/searchrequests/:query" component={SearchRequests} />
          <Route exact path="/searchrequests" component={SearchRequests} />
          <Route exact path="/newRequest" component={NewRequest} />
          <PrivateRoute exact path="/newfavour" component={NewFavour} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/request/:id" component={Request} />
          <PrivateRoute exact path="/favour/:id" component={Favour} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
