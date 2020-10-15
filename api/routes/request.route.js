var express = require("express");
var router = express.Router();
const Request = require("../models/Request.model");
const User = require("../models/User.model");
const { verifyUser } = require("../helpers/verifyUser");


router.get("/request", async (req, res) => {
  const request = await Request.findOne({_id : req.query.id});
  res.json(request);
  console.log(request);
});

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

module.exports = router;

module.exports = router;