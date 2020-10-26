var express = require("express");
var router = express.Router();
const Reward = require("../models/Reward.model");

//CURRENTLY HANDLED BY addReward helper file
router.post("/new", async (req, res) => {
  return res.status(404);
});

module.exports = router;
