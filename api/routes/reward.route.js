var express = require("express");
var router = express.Router();
const Reward = require("../models/Reward.model");

//Handles array of new rewards
router.post("/new", async (req, res) => {
  console.log(req.body);
  
  const reward = new Reward({
    name: req.body.name,
    content: req.body.content,
  });
  const savedReward = await reward.save();
  return res.status(200).send(savedReward);
});



module.exports = router;
