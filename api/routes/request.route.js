var express = require("express");
var router = express.Router();
const Request = require("../models/Request.model");
const { verifyUser } = require("../helpers/verifyUser");




router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

router.post("/mine", async (req, res) => {
  const { authToken } = req.body;
  const verifiedUser = verifyUser(authToken);
  const requests = await Request.find({ ownerID: verifiedUser.user._id });
  res.json(requests);
});

router.post("/delete", async (req, res) => {
  const { requestID, authToken } = req.body;
  const verifiedUser = verifyUser(authToken);
  const usersRequest = await Request.findOne({ _id: requestID });
  if (verifiedUser.user._id == usersRequest.ownerID){
    await Request.deleteOne({ _id: requestID });
  }
  const requests = await Request.find({ ownerID: verifiedUser.user._id });
  res.send(requests);
});

router.post("/new", async (req, res) => {
  let verifiedUser = verifyUser(req.body.token);
  console.log("here");
  console.log(req.body)
  if (verifiedUser.status != "200") {
    console.log("failed");
    return res.send(verifiedUser.status);
  }
  const request = new Request({
    ownerID: verifiedUser.user._id,
    name: req.body.name,
    content: req.body.content,
    completed: req.body.completed,
    chocolates: req.body.chocolates, 
    muffins: req.body.muffins
  });
  const savedRequest = await request.save();
  return res.status(200).send(savedRequest);
});

module.exports = router;



/*
GET Request prior to merge with Joseph's requests
router.post("/", async (req, res) => {

    var requestTitle = req.body.requestTitle;
    var cupcakes = req.body.cupcakes;
    var chocolates = req.body.chocolates;
    var mints = req.body.mints;
    var coffees = req.body.coffees;
    var icecreams = req.body.icecreams;

    const request = new Request({
        ownerID: "name",
        requestTitle: requestTitle,
        requeststatus: true,
        cupcakes: cupcakes,
        chocolates: chocolates,
        mints: mints,
        coffees: coffees,
        icecreams: icecreams
    });
    const savedRequest = await request.save();

    console.log(savedRequest);
}

)*/