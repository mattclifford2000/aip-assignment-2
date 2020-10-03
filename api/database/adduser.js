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


let addUser = (user) => {
  mongoose.connect(
    "mongodb+srv://lachlan:dgdsgdsgffhdbb@test.wdram.mongodb.net/users",
    {
      useNewUrlParser: true,
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connection Successful!");
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

    const User = mongoose.model("User", userSchema, "users");
    const datauser = new User({
      userEmail: user.email,
      userName: user.name,
      userPassword: user.password,
      userDOB: user.dateofbirth,
      userScore: 0,
      userDebts: [],
      userRequests: [],
      userCredits: [],
    });
    datauser.save(function (err, datauser) {
      if (err) return console.error(err);
      console.log(datauser.name + "saved to users!");
    });
  });
};

module.exports.addUser = addUser;
