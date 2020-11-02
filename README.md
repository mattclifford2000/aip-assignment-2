# AIP-Assignment-2


## Installation

To setup the project after cloning it, run 'npm install' in the directories api and client, and then run 'npm start' in both directories. 
Requires Node.js and npm to be installed

## API Documentation

-- Favours

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

