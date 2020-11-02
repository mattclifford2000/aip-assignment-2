const express = require("express");
var router = express.Router();
const { verifyUser } = require("../helpers/verifyUser");
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
  const savedFavour = await favour.save().then(
    emitFavour(favour, "addFavour")
  );
  console.log(savedFavour);
  res.status(200).send(savedFavour);

});

//accept request
router.post("/acceptRequest", async (req, res) => {
  const favour = new Favour({
    debitorID: req.body.debitorID,
    creditorID: req.body.creditorID,
    creditorName: req.body.creditorName,
    debitorName: req.body.debitorName,
    name: req.body.name,
    content: req.body.content,
    completed: false,
    chocolates: req.body.chocolates,
    mints: req.body.mints,
    pizzas: req.body.pizzas,
    coffees: req.body.coffees,
    candies: req.body.candies,
  });
  const savedFavour = await favour.save().then(() => {
    emitFavour("addFavour", favour);
  });
});


//get all user's owed favours
router.post("/myOwedFavours", async (req, res) => {
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    return res.send(verifiedUser.status);
  }
  else{
    const userID = verifiedUser.user._id;
    const favour = await Favour.find({ creditorID: userID, completed: false });
    res.json(favour);
  }
});

//get all user's owing favours
router.post("/myOwingFavours", async (req, res) => {
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    return res.send(verifiedUser.status);
  }
  else{
    const userID = verifiedUser.user._id;
    const favour = await Favour.find({ debitorID: userID, completed: false });
    res.json(favour);
  }
});

//get all user's completed favours
router.post("/myCompletedFavours", async (req, res) => {
  let verifiedUser = verifyUser(req.body.token);
  if (verifiedUser.status != "200") {
    return res.send(verifiedUser.status);
  }
  else{
    const userID = verifiedUser.user._id;
    const favour = await Favour.find({ debitorID: userID, completed: true });
    res.json(favour);
  }
});

//complete a favour
router.post("/complete", async (req, res) => {
  const id = req.body._id;
  const updatedFavour = await Favour.findOneAndUpdate({ _id: id }, { $set: { completed: true } }, {new: true}, (err, doc) => {
    if (err) console.log("Something wrong when updating data!");
    emitFavour(req.body, "deleteFavour");
    emitFavour(doc, "addFavour");
  });
  res.status(200).json(updatedFavour);
});
  

//add image to favour
router.post("/addImg", async (req, res) => {
  const id = req.body._id;
  const updatedFavour = await Favour.findOneAndUpdate({ _id: id }, { $set: { imageURL: req.body.imageURL, completed: true } }, {new: true}, (err, doc) => {
    if (err) console.log("Something wrong when updating data!");
    emitFavour(req.body, "deleteFavour");
    emitFavour(doc, "addFavour");
  });
  res.status(200).json(favour);
});

/**
 * When passed a favour and an action (addFavour, deleteFavour), emit it to applicable sockets
 * @param {Favour} favour 
 * @param {String} action 
 */
function emitFavour(favour, action){
  let debitorSockets = global.userSocketIDMap.get(favour.debitorID.toString());
  let creditorSockets = global.userSocketIDMap.get(favour.creditorID.toString());
  //Emit favour to all debitor sockets
  if(debitorSockets){
    debitorSockets.forEach(socketID => {
      global.io.to(socketID).emit(action, favour);
    });
  }
  //Emit favour to all creditor sockets
  if(creditorSockets){
    creditorSockets.forEach(socketID => {
      global.io.to(socketID).emit(action, favour);
    });
  }
}


module.exports = router;
