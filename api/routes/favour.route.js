const express = require("express");
var router = express.Router();
const { verifyUser } = require("../helpers/verifyUser");
const { addRewards } = require("../helpers/addRewards");
const User = require("../models/User.model");
const Favour = require("../models/Favour.model");

//find favour by ID
router.get("/favour", async (req, res) => {
  console.log(req.query.id);
  const favour = await Favour.findOne({ _id: req.query.id });
  res.json(favour);
});


//new favour
router.post("/new", async (req, res) => {
  console.log(req.body);
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    return res.send(verifiedUser.status);
  }

  const externalUser = await User.findOne({ email: req.body.externalemail });

  if (externalUser == null) {
    console.log("No User of that email exists")
    return res.status(404).send("No user of that email exists");
  }

  const favour = new Favour({
    debitorID: ((req.body.owed) ? verifiedUser.user._id : externalUser.id),
    creditorID: (!(req.body.owed) ? verifiedUser.user._id : externalUser.id),
    debitorName: req.body.myname,
    creditorName: req.body.externalemail,
    name: req.body.name,
    content: req.body.content,
    completed: false,
    chocolates: req.body.chocolates,
    mints: req.body.mints,
    pizzas: req.body.pizzas,
    coffees: req.body.coffees,
    candies: req.body.candies,
    imageURL: req.body.imageURL
  });
  const savedFavour = await favour.save();
  console.log(savedFavour);
  return res.status(200).send(savedFavour);
});

//get all user's owed favours
router.post("/myOwedFavours", async (req, res) => {
  const userID = req.body.userID;
  const favour = await Favour.find({ creditorID: userID, completed: false });
  res.json(favour);
});

//get all user's owing favours
router.post("/myOwingFavours", async (req, res) => {
  const userID = req.body.userID;
  const favour = await Favour.find({ debitorID: userID, completed: false });
  res.json(favour);
});

//get all user's completed favours
router.post("/myCompletedFavours", async (req, res) => {
  const userID = req.body.userID;
  const favour = await Favour.find({ debitorID: userID, completed: true });
  res.json(favour);
});

//complete a favour
router.post("/complete", async (req, res) => {
  const id = req.body._id;
  const favour = await Favour.updateOne({ _id: id }, { $set: { completed: true } });
});

//add image to favour
router.post("/addImg", async (req, res) => {
  const favour = await Favour.updateOne({ _id: req.body._id }, { $set: { imageURL: req.body.imageURL, completed: true } });
  res.status(200).json(favour);
});

module.exports = router;
