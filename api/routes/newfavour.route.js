const express = require("express");
var router = express.Router();
const { verifyUser } = require("../helpers/verifyUser");
const User = require("../models/User.model");
const Favour = require("../models/Favour.model");

router.post("/", async (req, res) => {
  console.log(req.body);
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    return res.send(verifiedUser.status);
  }

  const externalUser = await User.findOne({email : req.body.externalemail});

  const favour = new Favour({
    debitorID: ((req.body.owed) ? verifiedUser.user._id : externalUser.id),
    creditorID: (!(req.body.owed) ? verifiedUser.user._id : externalUser.id),
    favourname: req.body.favourname,
    favourcontent: req.body.favourcontent,
    favourcompleted: false,
  });

  const savedFavour = await favour.save();
  console.log(savedFavour);
  return res.status(200).send(savedFavour);
});

module.exports = router;
