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
  console.log("back in favour");
  console.log(rewardIDs);
  const externalUser = await User.findOne({email : req.body.externalemail});
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

module.exports = router;
