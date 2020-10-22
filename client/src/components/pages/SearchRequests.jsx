import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Row, Spinner, Modal, Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../styles/searchRequests.css";
import RequestCard from "../shared/RequestCard";
import SearchBox from "../shared/SearchBox";
import "./../../styles/Home.css";



function SearchRequests(props) {
    const [requests, setRequests] = useState([]); //search results
    let { query } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [resultIndicator, setResultIndicator] = useState(); //"results for..." text
    const [show, setShow] = useState(false);


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

    function handleClose() {
        setShow(false)



    function handleAccept(request) {

        const urlUser = "/login/findUser";
        const OwnerID = request.ownerID;
        const owner = "";


        const urlUserOther = "/login/findUserOther";
        const debitorID = localStorage.getItem('userID')
        const debitor = "";

        //get request creator's email address for favour debitorID
        axios
            .post(urlUser, { OwnerID })
            .then((res) => {
                const owner = res.data
                console.log("owner email: " + owner.email)

                //get my email
                axios
                    .post(urlUserOther, { debitorID })
                    .then((res) => {
                        const debitor = res.data
                        console.log("debitor email: " + debitor.email)

                        //turn request into a favour that I owe to the request creator
                        const favour = {
                            token: localStorage.getItem("authToken"),
                            creditorID: OwnerID, // request creator email
                            debitorID: debitorID, //my email
                            externalemail: owner.email,
                            creditorName: request.ownerName,
                            owed: owner.email,
                            name: request.name,
                            content: request.content,
                            completed: false,
                            rewards: "da",
                        };

                        const urlFavour = "/favour/requestToFavour";
                        axios
                            .post(urlFavour, favour)
                            .then((response) => {
                                console.log(response);

                                //delete request from database
                                const url = "/request/acceptRequest";
                                const _id = request._id
                                axios
                                    .post(url, { _id })
                                    .then((response) => {
                                    })
                            })
                    })
            })
        setShow(true)
    }


    if (isLoading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>;
    }

    return (
        <div>
            <h1> Search requests </h1>
            <p>  Search public requests </p>
            <SearchBox initType="requests"></SearchBox>

            {/* Only show if a search query has been made */}
            {/* Single result */}
            {resultIndicator != undefined && requests.length == 1 &&
                <div>
                    <p> {requests.length} result for "{resultIndicator}" </p> </div>}

            {/* Multiple results */}
            {resultIndicator != undefined && requests.length > 1 &&
                <div>
                    <p> {requests.length} results for "{resultIndicator}" </p> </div>}

            {/* No results */}
            {resultIndicator != undefined && requests.length == 0 &&
                <div>
                    <p> No results for "{resultIndicator}" </p> </div>}



            <Row>
                {requests.map((request) => (
                    <RequestCard request={request} onAccept={() => { handleAccept(request) }}></RequestCard> //onaccept add
                ))}
            </Row>



            <Modal show={show} onHide={handleClose}>
                <Modal.Body>You successfully accepted a request. It is now an owed favour on your profile page.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok
          </Button>
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

