var express = require("express");
var router = express.Router();
var axios = require("axios");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

let users = [];
//User not adding properly
router.post("/", async (req, res) => {
  console.log("Success!");
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  console.log("Users : ", JSON.stringify(users));
  res.end(JSON.stringify(users));
}); 


router.get('/', async (req, res) => {
  res.send("Register endpoint is visible");
})

module.exports = router;
