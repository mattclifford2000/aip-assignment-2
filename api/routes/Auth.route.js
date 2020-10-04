const express = require("express");
const router = express.Router();
const { verifyLoginUser, verifyRegisterUser } = require("../helpers/validator");

const User = require("../models/User.model");

router.post("/register", async (req, res) => {
  var user = req.body.user;
  console.log(user);
  try {
    const { error } = verifyRegisterUser(user);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/login", async (req, res) => {
  var login = req.body.login;
  console.log(login);
  try {
    const { error } = verifyRegisterUser(login);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/register", async (req, res) => {
  res.json({ message: "This is the register route!" });
});

router.get("/login", async (req, res) => {
  res.json({ message: "This is the loginroute!" });
});

module.exports = router;
