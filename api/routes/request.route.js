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

router.post("/myrequests", async (req, res) => {
  const { authToken } = req.body;
  const verifiedUser = verifyUser(authToken);
  const requests = await Request.find({ ownerID: verifiedUser.user._id });
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
});

module.exports = router;