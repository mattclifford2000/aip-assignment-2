var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var http_module = require("http");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const { Base64 } = require("js-base64");
var io = require('./io');


require("dotenv").config();
io.on('connection', function(socket) {
  console.log('Client connected!');
  socket.emit('update', 'Working!');

  socket.on('message', function (data) {
      console.log('Sending update!');
      socket.emit('update', 'Working!');
  });
});

/*
io.sockets.on("connection", (socket) => {
  //add client to online users list
  addClientToMap(userName, socket.id);
  });

  socket.on("disconnect", () => {
    //remove this client from online list
    removeClientFromMap(userName, socket.id);
    });*/

global.io = io;

const LoginRoute = require("./routes/login.route");
const RegisterRoute = require("./routes/register.route");
const VerifyRoute = require("./routes/verify.route");
const ListRoute = require("./routes/Lists.route");
const RequestRoute = require("./routes/request.route");
/*const NewRequestRoute = require("./routes/newrequest.route");*/
const FavourRoute = require("./routes/favour.route");
const RewardRoute = require("./routes/reward.route");


require("./database/initDB")();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/login", LoginRoute);
app.use("/register", RegisterRoute);
app.use("/verify", VerifyRoute);
app.use("/request", RequestRoute);
app.use("/favour", FavourRoute);
app.use("/reward", RewardRoute);
app.use("/lists", ListRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
