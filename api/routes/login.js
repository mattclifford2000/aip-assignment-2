var express = require("express");
var router = express.Router();
var axios = require("axios");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

let logins = [];

router.post("/", async (req, res) => {
  console.log("Success! Data Posted!");
  console.log(req.header('Content-Type'));
  console.log(req.body.login);
  var login = req.body.login;
}); 

//test for visibility
router.get('/', async (req, res) => {
    res.send("Login endpoint is visible");
  })

  module.exports = router;