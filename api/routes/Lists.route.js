
var express = require("express");
var router = express.Router();
const User = require("../models/User.model");

router.get("/leaderboard", async (req, res) => {
  const users = await User
    .find({}, {name: 1, score: 1}) //Finds all users with {}, then uses projection to return the name and score field (0 false, 1 true)
    .sort({ score: -1 }) //Use the score field to sort the query by score descending
    .limit(10); //Only take the top 10 results from the query

  res.json(users);
  console.log("Sent Leaderboard");
});

module.exports = router;
