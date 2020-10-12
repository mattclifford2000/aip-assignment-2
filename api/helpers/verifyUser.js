const User = require("../models/User.model");
const { parseJwt } = require("../helpers/parseJwt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyUser = (token) => {
  if (token == null) return { status: "401", user: {} };
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return { status: "403", user: {} };
    console.log("Valid!");
    console.log(parseJwt(token));
  });
  return { status: "200", user: parseJwt(token) };
};

module.exports.verifyUser = verifyUser;
