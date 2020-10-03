var express = require("express");
var router = express.Router();
var axios = require("axios");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

let users = [];
//User not adding properly, appears to be blank
//Could be client or api
router.post("/", async (req, res) => {
  console.log("Success! Data Posted!");
  console.log(req.header('Content-Type'));
  console.log(req.body.user);
  var user = req.body.user;
  users.push(user);
  console.log("Users : ", users.length);
  console.log("Success! Data Posted!");
  res.end(JSON.stringify(users));
});
;
//Test for visibility
router.get("/", async (req, res) => {
  res.send("Register endpoint is visible");
});

module.exports = router;
