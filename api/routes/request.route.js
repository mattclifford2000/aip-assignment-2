var express = require("express");
var router = express.Router();
const Request = require("../models/Request.model");


router.get("/", async (req, res) => {


    const requests = await Request
        .find()

    res.json(requests)
    console.log("Sent request");
    console.log(requests)
});

module.exports = router;
