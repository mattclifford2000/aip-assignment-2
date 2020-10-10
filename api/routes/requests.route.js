
var express = require("express");
var router = express.Router();
const Requests = require("../models/Request.model");

router.get("/mine", async (req, res) => {
    const requests = await Requests.find()

    res.json(requests);
    console.log("Sent Requests");
});

module.exports = router;
