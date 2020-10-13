var express = require("express");
var router = express.Router();
const Request = require("../models/Request.model");
const User = require("../models/User.model");
const { verifyUser } = require("../helpers/verifyUser");




router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
  console.log("Sent request");
});

router.post("/mine", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  const requests = await Request.find({ ownerID: user._id });
  res.json(requests);
});

router.post("/delete", async (req, res) => {
  const { requestID, authToken } = req.body;
  const verifiedUser = verifyUser(authToken);
  const requests = await Request.findOne({ _id: requestID });
  if (verifiedUser.user._id == requests.ownerID){
    console.log("deleting")
    const request = await Request.deleteOne({ _id: requestID });
    console.log(request);
  }
    //res.json(request);
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