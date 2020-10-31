var express = require("express");
var router = express.Router();
const User = require("../models/User.model");
var io = require("../bin/www")

//display leaderboard
router.get("/leaderboard", async (req, res) => {
  const users = await User
    .find({}, { name: 1, score: 1 }) //Finds all users with {}, then uses projection to return the name and score field (0 false, 1 true)
    .sort({ score: -1 }) //Use the score field to sort the query by score descending
    .limit(10); //Only take the top 10 results from the query
  res.json(users);
});

//increment score by 1 when favour completed
router.post("/addScore", async (req, res) => {
  const userID = req.body.userID
  const user = await User.updateOne({ _id: userID }, { $inc: { score: 1, } });
  console.log("done")
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
});

module.exports = router;

