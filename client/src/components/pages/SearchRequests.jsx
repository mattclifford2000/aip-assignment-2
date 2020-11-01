import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Row, Spinner, Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../styles/searchRequests.scss";
import RequestCard from "../shared/RequestCard";
import SearchBox from "../shared/SearchBox";
import "./../../styles/Home.scss";

function SearchRequests(props) {
    const [requests, setRequests] = useState([]);
    const { query } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [resultIndicator, setResultIndicator] = useState(); //"results for..." text
    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false)

    useEffect(() => {
        if (query) {
            const url = "/request/searchRequest";
            axios
                .post(url, { query })
                .then((response) => {
                    setRequests(response.data);
                })
            setResultIndicator(query);
        }
        setLoading(false);
    }, []);

    if (isLoading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>;
    }

    //close modal
    function handleClose() {
        setShow(false)
        setDeleteShow(false)
    }

    //accept request
    function handleAccept(request) {
        const favour = {
            debitorID: request.ownerID,
            creditorID: localStorage.getItem("userID"),
            creditorName: localStorage.getItem("username"),
            debitorName: request.ownerName,
            name: request.name,
            content: request.content,
            completed: false,
            chocolates: request.chocolates,
            mints: request.mints,
            pizzas: request.pizzas,
            coffees: request.coffees,
            candies: request.candies,
        }

        //convert request to owed favour by creating new favour using request details
        const favourURL = "/favour/acceptRequest";
        axios
            .post(favourURL, favour)

        //delete request from database so it doesn't show up as a request anymore
        const requestURL = "/request/acceptRequest";
        const _id = request._id
        axios
            .post(requestURL, { _id })

        setShow(true)
    }

    //delete request
    const handleDelete = (request) => {
        console.log(localStorage.getItem('userID'));
        axios
            .post("/request/delete", {
                requestID: request._id,
                authToken: localStorage.getItem('authToken')
            })
            .then((res) => {
                setRequests(res.data);
            });
        setDeleteShow(true)
    }

    return (
        <div>
            <h1> Search requests </h1>
            <p>  Search public requests </p>
            <SearchBox initType="requests"></SearchBox>

            {/* Single result */}
            {resultIndicator !== undefined && requests.length === 1 &&
                <div> <p> {requests.length} result for "{resultIndicator}" </p> </div>}

            {/* Multiple results */}
            {resultIndicator !== undefined && requests.length > 1 &&
                <div> <p> {requests.length} results for "{resultIndicator}" </p> </div>}

            {/* No results */}
            {resultIndicator !== undefined && requests.length === 0 &&
                <div> <p> No results for "{resultIndicator}" </p> </div>}

            <Row max-width="100%">
                {requests.map((request) => (<RequestCard request={request} onAccept={() => { handleAccept(request) }} onDelete={() => { handleDelete(request) }}></RequestCard>))}
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>You successfully accepted a request. It is now an owed favour on your profile page.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}> Ok </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteShow} onHide={handleClose}>
                <Modal.Body>You successfully deleted a request.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}> Ok </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

//export default SearchRequests;
export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/searchrequests/:query" children={<SearchRequests />} />
                <Route path="/searchrequests/" children={<SearchRequests />} />
            </Switch>
        </Router>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);