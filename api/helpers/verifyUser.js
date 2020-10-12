const User = require("../models/User.model");
const { parseJwt } = require("../helpers/parseJwt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyUser = (token) => {
  console.log(token);
  console.log(process.env.ACCESS_TOKEN_SECRET);
  //console.log(parseJwt(token));
  if (token == null) return { status: "401", user: {} };
  /*
  const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return { status: "403", user: {} };
    console.log("Valid!");
  });
  return { status: "200", user: parseJwt(token) };*/
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //console.log(verified);
  } catch (err) {
    return { status: "400", user: {} };
  }
  return { status: "200", user: parseJwt(token) };
};

module.exports.verifyUser = verifyUser;
