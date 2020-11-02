# AIP-Assignment-2


## Installation

To setup the project after cloning it, run 'npm install' in the directories api and client, and then run 'npm start' in both directories. 
Requires Node.js and npm to be installed

## Project status

This project is part of a group assignment being developed at University Technology Sydney. After the 2nd of November
this project's roadmap will end. Do not expect continued support for this project.

## API Documentation

- ### Favours

GET /favour:
    Params: ID of a query
    Returns: a single favour object
    
POST /new:
    Params: A favour object, A auth token
    Function: Saves a new favour in the database
    Returns: Status code

POST /acceptRequest:
    Params: A favour object
    Function: Accepts a favour

POST /myOwedFavours:
    Params: a users ID
    Returns: List of favour objects owed

POST /myOwedFavours:
    Params: a users ID
    Returns: List of favour objects owing

POST /myCompletedFavours:
    Params: a users ID
    Returns: List of favour objects completed

POST /complete:
    Params: a ID of a favour
    Function: Turns the completed field of that favour to true
    Returns: Status code

POST /addImg:
    Params: a ID of a favour, a URL for an image
    Function: Updates favour objects image field with the provided URL and sets completed field to true
    Returns: Status code

- ### Requests

GET /:
    Returns: All request objects in the database

GET /request:
    Params: a ID of a request
    Returns: a request object

POST /searchRequest:
    Params: a string which will be queried
    Function: Queries all requests to check if the query is in name or content of request object
    Returns: a list of request objects

POST /acceptRequest:
    Params: a ID of a request
    Function: Deletes the request from the database
    Returns: status code

POST /myRequests:
    Params: a ID of a user
    Returns: a list of request objects owned by the user

POST /delete:
    Params: a ID of a request, an auth token
    Function: Verify the request selected is owned by the auth token owner, then deletes request
    Returns: status code

POST /new:
    Params: a request object, an auth token
    Function: Verify the request selected is owned by the auth token owner, then creates request
    Returns: status code

- ### User

POST /login:
    Params: username, password
    Function: checks if user exists and if credentials are correct
    Returns: Authentication token

POST /register:
    Params: username, password, email, date of birth
    Function: checks if new user is valid, then creates user in DB
    Returns: a user object

POST /findUserByID:
    Params: a ID of a user
    Returns: a user object

- ### Lists

GET /leaderboard:
    Returns: JSON leaderboard object

POST /addScore:
    Params: a ID of a user
    Functrion: Increments one to the users score, then updates the leaderboard

## License

MIT License

Copyright (c) 2020 UTS-AIP-SPR-2020

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Credit

Developed by Group UTS-AIP-SPR-2020, consisting of Matthew Clifford (Klauser5), Ethan Choi (ethan-choi), Joe Drew (josephjdrew), and Lachlan Brown (LachlanB96).

External Credits (credit in comments adjacent to functions/files):

MediaQueries.scss (Client): Glenn McComb (https://glennmccomb.com/articles/useful-sass-scss-media-query-mixins-for-bootstrap/)

parseJwt.js (API): Peheje (https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library)

addClientToMap and removeClientFromMap functions (App.js, API): Albanero (https://medium.com/@albanero/socket-io-track-online-users-d8ed1df2cb88)
