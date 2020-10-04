var express = require("express");
var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
//var adduser = require("./../database/adduser");


router.post("/", async (req, res) => {
  console.log("Success! Data Posted!");
  console.log(req.header('Content-Type'));
  console.log(req.body.user);
  var user = req.body.user;
  //adduser.addUser(user);
//
});




//Test for visibility
router.get("/", async (req, res) => {
  res.send("Register endpoint is visible");
});

module.exports = router;

