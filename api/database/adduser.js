var createError = require("http-errors");
var express = require("express");
var path = require("path");
var http_module = require("http");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
const { connect, connection } = require('mongoose');
const { config } = require('dotenv'); 
const User = require('../models/Users.model');

let addUser = (user) => {
  
  
};

module.exports.addUser = addUser;
