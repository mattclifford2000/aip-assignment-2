const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { verifyUser } = require("../helpers/verifyUser");

require("dotenv").config();

router.post("/", async (req, res) => {
  return res.send(verifyUser(req.body.token));
});

router.get("/", async (req, res) => {
  res.json({ message: "This is the verify route!" });
});

module.exports = router;
