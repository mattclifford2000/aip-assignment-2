
var express = require("express");
var router = express.Router();
const Favour = require("../models/Favour.model");

router.get("/mine", async (req, res) => {
    const favours = await Favour.find()

    res.json(favours);
    console.log("Sent Favours");
});

module.exports = router;
