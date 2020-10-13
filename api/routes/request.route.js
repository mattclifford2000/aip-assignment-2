var express = require("express");
var router = express.Router();
const Request = require("../models/Request.model");
const User = require("../models/User.model");



router.get("/", async (req, res) => {
  const requests = await Request.find();
  console.log(requests);
  res.json(requests);
  console.log("Sent request");
});

router.post("/mine", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  const requests = await Request.find({ ownerID: user._id });
  res.json(requests);
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