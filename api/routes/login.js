var express = require("express");
var router = express.Router();
var axios = require("axios");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

let logins = [];

router.post("/", async (req, res) => {
  console.log("Success!");
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  console.log("Logins : ", JSON.stringify(logins));
  res.end(JSON.stringify(logins));
}); 

//test for visibility
router.get('/', async (req, res) => {
    res.send("Login endpoint is visible");
  })

  module.exports = router;