var express = require("express");
var router = express.Router();
const User = require("../models/User.model");
var leaderboard = null;

//display leaderboard
router.get("/leaderboard", async (req, res) => {
  if (leaderboard == null) await updateLeaderboard();
  res.json(leaderboard);
});

//increment score by 1 when favour completed
router.post("/addScore", async (req, res) => {
  const userID = req.body.userID
  const user = await User.findOneAndUpdate({ _id: userID }, { $inc: { score: 1, } });
  //If this user is in the leaderboard and has had their score change, or has entered the top 10, emit the changes to clients
  if (leaderboard == null || user.score >= leaderboard[9].score) {
    updateLeaderboard();
  }
});

async function updateLeaderboard() {
  const users = await User
    .find({}, { name: 1, score: 1 }) //Finds all users with {}, then uses projection to return the name and score field (0 false, 1 true)
    .sort({ score: -1 }) //Use the score field to sort the query by score descending
    .limit(10); //Only take the top 10 results from the query
  leaderboard = users;
  //Update leaderboard client side for users with page already loaded.
  global.io.emit('leaderboard', leaderboard);
}

module.exports = router;

