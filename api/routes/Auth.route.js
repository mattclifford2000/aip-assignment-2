const express = require("express");
const router = express.Router();
const { verifyLoginUser, verifyRegisterUser } = require("../helpers/validator");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

router.post("/register", async (req, res) => {
  var body = req.body.user;
  console.log(body);
  try {
    const { error } = verifyRegisterUser(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  } catch (err) {
    console.error(err.message);
  }
  const emailExists = await User.exists({ email: body.email });
  if (emailExists)
    return res.status(400).send("A user exists with this email.");
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
  res.send(savedUser);
});

router.post("/login", async (req, res) => {
  var body = req.body.login;
  console.log(body);
  try {
    const { error } = verifyRegisterUser(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  } catch (err) {
    console.error(err.message);
  }
  const user = await User.findOne({ email: body.email });
  if (!user)
    return res
      .status(400)
      .send(
        "Account does not exist with provided email and password combination."
      );
  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");
  res.send("Login Successful!");
});

router.get("/register", async (req, res) => {
  res.json({ message: "This is the register route!" });
});

router.get("/login", async (req, res) => {
  res.json({ message: "This is the loginroute!" });
});

module.exports = router;
