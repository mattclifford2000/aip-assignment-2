const express = require("express");
var router = express.Router();
const { verifyUser } = require("../helpers/verifyUser");
const { addRewards } = require("../helpers/addRewards");

const User = require("../models/User.model");
const Reward = require("../models/Reward.model");
const Favour = require("../models/Favour.model");

router.post("/new", async (req, res) => {
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    return res.send(verifiedUser.status);
  }
  const rewardIDs = await addRewards(req.body.rewards);

  const externalUser = await User.findOne({ email: req.body.externalemail });

  if (externalUser == null) {
    console.log("No User of that email exists")
    return res.status(404).send("No User of that email exists");
  }

  const favour = new Favour({
    debitorID: ((req.body.owed) ? verifiedUser.user._id : externalUser.id),
    creditorID: (!(req.body.owed) ? verifiedUser.user._id : externalUser.id),
    name: req.body.name,
    content: req.body.content,
    completed: false,
    rewardIDs: rewardIDs
  });

  const savedFavour = await favour.save();
  console.log(savedFavour);
  return res.status(200).send(savedFavour);
});


router.post("/requestToFavour", async (req, res) => {
  const rewardIDs = await addRewards(req.body.rewards);
  const favour = new Favour({
    debitorID: (req.body.creditorID),
    creditorID: (req.body.debitorID),
    name: req.body.name,
    content: req.body.content,
    completed: false,
    rewardIDs: rewardIDs
  });

  const savedFavour = await favour.save();
  console.log(savedFavour);
  return res.status(200).send(savedFavour);
});




router.post("/myOwedFavours", async (req, res) => {
  console.log(req.body.userID);
  const userID = req.body.userID;
  const favour = await Favour.find({ creditorID: userID });
  res.json(favour);
  console.log(favour);
});


router.post("/myOwingFavours", async (req, res) => {
  console.log(req.body.userID);
  const userID = req.body.userID;
  const favour = await Favour.find({ debitorID: userID });
  res.json(favour);
  console.log(favour);
});


module.exports = router;
