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
db.once("open", function () {
  const kittySchema = new mongoose.Schema({
    name: String,
  });
  const Kitten = mongoose.model("Kitten", kittySchema);
  const silence = new Kitten({ name: "Silence" });
  //console.log(silence.name);
  silence.save(function (err, silence) {
    if (err) return console.log(err);
    //console.log(silence.name);
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
});

//mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
