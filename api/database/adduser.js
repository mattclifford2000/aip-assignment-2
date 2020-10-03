var createError = require("http-errors");
var express = require("express");
var path = require("path");
var http_module = require("http");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://lachlan:dgdsgdsgffhdbb@test.wdram.mongodb.net/assignment2",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

function addUser(user)
{
  db.once("open", function () {
    const userSchema = new mongoose.Schema({
      userEmail: String,
      userName: String,
      userPassword: String,
      userDOB: Date,
      userScore: Number,
      userDebts: Array,
      userRequests: Array,
      userCredits: Array,
    });
    const User = mongoose.model("User", userSchema);
    const silence = new User({
      userEmail: "test@testerm.com",
      userName: "Silence",
      userPassword: "",
      userDOB: "1988-12-09T13:00:00.000+00:00",
      userScore: 3,
      userDebts: [],
      userRequests: [],
      userCredits: [],
    });
    //console.log(silence.name);
    silence.save(function (err, silence) {
      if (err) return console.log(err);
      //console.log(silence.name);
    });
  
    User.find(function (err, users) {
      if (err) return console.error(err);
      console.log(users);
    });
  });
}


