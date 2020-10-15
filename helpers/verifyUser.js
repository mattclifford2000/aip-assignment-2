const User = require("../models/User.model");
const { parseJwt } = require("./parseJwt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//Returns a HTTP status code, and user if JWT is valid.
const verifyUser = (token) => {
  if (token == null) return { status: 401, user: {} };
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return { status: 400, user: {} };
  }
  return { status: 200, user: parseJwt(token) };
};

module.exports.verifyUser = verifyUser;
