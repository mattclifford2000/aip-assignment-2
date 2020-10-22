var express = require("express");
var router = express.Router();
const Request = require("../models/Request.model");
const verifyRequest = require("../helpers/verifyRequest");
const { verifyUser } = require("../helpers/verifyUser");

router.get("/request", async (req, res) => {
  const request = await Request.findOne({ _id: req.query.id });
  res.json(request);
});

router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

router.post("/searchRequest", async (req, res) => {
  console.log(req.body.query);
  const query = req.body.query;
  /* return results where name OR content contains the search query */
  const result = await Request.find({
    $or: [
      { name: { $regex: req.body.query } },
      { content: { $regex: req.body.query } },
      { [req.body.query]: { $gt: 0 } },
    ],
  });

  res.json(result);
  console.log(result);
});

router.post("/acceptRequest", async (req, res) => {
  console.log(req.body._id);
  const id = req.body._id;
  const request = await Request.deleteOne({ _id: id });
});

router.post("/mine", async (req, res) => {
  const { authToken } = req.body;
  const verifiedUser = verifyUser(authToken);
  const requests = await Request.find({ ownerID: verifiedUser.user._id });
  res.json(requests);
});

router.post("/myRequests", async (req, res) => {
  const ownerID = req.body.userID;
  const requests = await Request.find({ ownerID: ownerID });
  res.json(requests);
});

router.post("/delete", async (req, res) => {
  const { requestID, authToken } = req.body;
  const verifiedUser = verifyUser(authToken);
  const usersRequest = await Request.findOne({ _id: requestID });
  if (verifiedUser.user._id == usersRequest.ownerID) {
    await Request.deleteOne({ _id: requestID });
  }
  const requests = await Request.find({ ownerID: verifiedUser.user._id });
  res.send(requests);
});

router.post("/new", async (req, res) => {
  const { request, authToken } = req.body;
  let verifiedUser = verifyUser(authToken);
  if (verifiedUser.status != "200") {
    return res.status(verifiedUser.status).send(verifiedUser.status);
  }
  const newRequest = new Request({
    ownerID: request.ownerID,
    ownerName: request.ownerName,
    name: request.name,
    content: request.content,
    completed: request.completed,
    chocolates: request.chocolates,
    mints: request.mints,
    pizzas: request.pizzas,
    coffees: request.coffees,
    candies: request.candies,
  });
  try {
    const { error } = verifyRequest(newRequest);
    if (error) {
      console.log("Does not meet schema");
      return res.status(400).send(error.details[0].message);
    }
  } catch (err) {
    console.error(err.message);
  }
  const savedRequest = newRequest.save();
  console.log(savedRequest);
  return res.status(200).send(savedRequest);
});

module.exports = router;
