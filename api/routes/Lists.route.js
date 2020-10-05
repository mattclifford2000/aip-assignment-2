const { compare } = require("bcrypt");
var express = require("express");
var router = express.Router();
const User = require("../models/User.model");

//Efforts to send just name and score have proven unsuccessful. 
//If you can figure it out please fix it ASAP as sending the 
//whole user probably qualifies as very insecure.
router.get("/leaderboard", async (req, res) => {
  const users = await User.find();
  const userwithscore = {
    name: "",
    score: "",
  };
  const userswithscores = [];
  var size = Object.keys(users).length;
  if (size == 0) {
    console.log("0 users in system");
  } else {
    console.log("1 or more users in system");
  }

  res.json(users);
  console.log("Sent Leaderboard");
});

module.exports = router;
