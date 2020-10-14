const express = require("express");
var router = express.Router();
const { verifyUser } = require("../helpers/verifyUser");
const User = require("../models/User.model");
const Favour = require("../models/Favour.model");

router.post("/", async (req, res) => {
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    return res.send(verifiedUser.status);
  }
  const favour = new Favour({
    debitorID: req.body.debitorID,
    creditorID: req.body.creditorID,
    favourname: req.body.favourname,
    favourcontent: req.body.favourcontent,
    favourcompleted: false,
  });
  console.log(verifiedUser.user._id);
  console.log(favour.debitorID);
  if (verifiedUser.user._id != favour.debitorID && verifiedUser.user._id != favour.creditorID){
    return res.send(403);
  }
  const savedFavour = await favour.save();
  console.log(savedFavour);
  return res.status(200).send(savedFavour);
});

router.get("/", async (req, res) => {
  res.json({ message: "This is the newfavour route!" });
});

module.exports = router;
