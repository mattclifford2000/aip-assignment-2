var express = require("express");
var router = express.Router();
const Request = require("../models/Request.model");
const { verifyUser } = require("../helpers/verifyUser");


router.get("/request", async (req, res) => {
  const request = await Request.findOne({ _id: req.query.id });
  res.json(request);
  console.log(request);
});



router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});


router.post("/searchRequest", async (req, res) => {
  console.log(req.body.query);
  const query = req.body.query;

  var regex = RegExp('.*' + query + '.*')

  /* This only returns results where search query is at the start of the request name OR content. */
  /* Need to work out how to return results where query is contained anywhere in the request name OR content */
  const result = await Request.find({
    $or: [{ name: new RegExp('^' + req.body.query) },
    { content: new RegExp('^' + req.body.query + '.*') }]
  });

  res.json(result);
  console.log(result)
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
  if (verifiedUser.user._id == usersRequest.ownerID) {
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
