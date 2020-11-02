const express = require("express");
var router = express.Router();
const { verifyLoginUser, verifyRegisterUser } = require("../helpers/validator");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Request = require("../models/Request.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();


//login user
router.post("/login", async (req, res) => {
  console.log(req.body);
  var userCredentials = req.body.login;
  try {
    const { error } = verifyLoginUser(userCredentials);
    if (error) {
      console.log("Does not meet schema");
      return res.status(400).send(error.details[0].message);
    }
  } catch (err) {
    console.error(err.message);
  }
  const user = await User.findOne({ email: userCredentials.email });
  if (!user) {
    console.log("No user with email found.");
    return res
      .status(400)
      .send(
        "Account does not exist with provided email and password combination."
      );
  }
  const validPassword = await bcrypt.compare(
    userCredentials.password,
    user.password
  );
  if (!validPassword) {
    console.log("Incorrect password");
    return res.status(400).send("Incorrect Password");
  }
  user.password = null;
  const authToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
  return res.send({ email: user.email, name: user.name, authToken, id: user._id, user });
});


//register new user
router.post("/register", async (req, res) => {
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  var dateofbirth = req.body.dateofbirth;
  var body = { name: name, email: email, password: password, dateofbirth: dateofbirth };

  try {
    console.log(body);
    const { error } = verifyRegisterUser(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }

  const emailExists = await User.exists({ email: body.email });

  if (emailExists)
    return res.status(409).send("A user exists with this email.");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);
  var newRole = "user";

  if (body.email.includes("@favourcentre.com.au")) {
    newRole = "admin";
  }

  const user = new User({
    name: body.name,
    email: body.email,
    password: hashPassword,
    dateofbirth: body.dateofbirth,
    role: newRole,
    score: body.score,
    debits: body.debits,
    credits: body.credits,
    requests: body.requests,
  });

  const savedUser = await user.save();
  return res.status(200).send(savedUser);
});

//find user by their userid
router.post("/findUserByID", async (req, res) => {
  const userID = req.body.userID;
  const user = await User.findOne({ _id: userID });
  res.json(user)
});


module.exports = router;
