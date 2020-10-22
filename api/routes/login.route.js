const express = require("express");
var router = express.Router();
const { verifyLoginUser, verifyRegisterUser } = require("../helpers/validator");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Request = require("../models/Request.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/", async (req, res) => {
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
  return res.send({ name: user.name, authToken, id: user._id, user });
});

router.get("/", async (req, res) => {
  res.json({ message: "This is the login route!" });
});


router.post("/findUser", async (req, res) => {
  console.log(req.body.OwnerID)
  const OwnerID = req.body.OwnerID;
  const user = await User.findOne({ _id: OwnerID });
  console.log(user)
  res.json(user)
});


router.post("/findUserOther", async (req, res) => { //bad route name, will fix later
  console.log(req.body.debitorID)
  const debitorID = req.body.debitorID;
  const user = await User.findOne({ _id: debitorID });
  console.log(user)
  res.json(user)
});


router.post("/findUserProfile", async (req, res) => { //bad route name, will fix later
  console.log(req.body.userID)
  const userID = req.body.userID;
  const user = await User.findOne({ _id: userID });
  console.log(user)
  res.json(user)
});


router.post("/addScore", async (req, res) => {
  const userID = req.body.userID
  const user = await User.updateOne({ _id: userID }, { $inc: { score: 1, } });
  console.log("done")
});



module.exports = router;
