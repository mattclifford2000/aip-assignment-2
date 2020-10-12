const express = require("express");
var router = express.Router();
const { verifyUser } = require("../helpers/verifyUser");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Request = require("../models/Request.model");

router.post("/", async (req, res) => {
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    console.log("failed");
    return res.send(verifiedUser.status);
  }
  const request = new Request({
    ownerID: verifiedUser.user._id,
    requestname: req.body.requestname,
    requestcontent: req.body.requestcontent,
    requestcompleted: req.body.requestcompleted,
  });
  const savedRequest = await request.save();
  console.log(savedRequest);
  return res.status(200).send(savedRequest);
});

router.get("/", async (req, res) => {
  res.json({ message: "This is the newfavour route!" });
});

module.exports = router;
