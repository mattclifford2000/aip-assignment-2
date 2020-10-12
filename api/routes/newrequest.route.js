const express = require("express");
var router = express.Router();
const { verifyUser } = require("../helpers/verifyUser");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Request = require("../models/Request.model");

router.post("/", async (req, res) => {
  console.log("Successful POST register.");
  let verifiedUser = verifyUser(req.body.token);
  console.log(verifiedUser.status);
  if (verifiedUser.status != "200") {
    console.log("failed");
    return res.send(verifiedUser.status);
  }

  //const emailExists = await User.exists({ email: body.email });
  /* if (emailExists)
    return res.status(200).send("A user exists with this email.");*/
  /*const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);
  var newRole = "user";
  if (body.email.includes("@favourcentre.com.au")) {
    newRole = "admin";
  }*/
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
