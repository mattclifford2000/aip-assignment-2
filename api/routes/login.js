var express = require("express");
var router = express.Router();
var axios = require("axios");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

let users = [];

router.get('/', async (req, res) => {
    res.send("Login endpoint is visible");
  })