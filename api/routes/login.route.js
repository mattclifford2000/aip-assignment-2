const express = require("express");
var router = express.Router();
const { verifyLoginUser, verifyRegisterUser } = require("../helpers/validator");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

require('dotenv').config();

router.post("/", async (req, res) => {
    console.log(req.body);
    var userCredentials = req.body.login;
    try {
        const { error } = verifyLoginUser(userCredentials);
        if (error) {
            console.log("Does not meet schema");
            return res.status(400).send(error.details[0].message);

        }
    } catch (err) {
        console.error(err.message);
    }
    const user = await User.findOne({ email: userCredentials.email });
    if (!user) {
        console.log("No user with email found.");
        return res
            .status(400)
            .send(
                "Account does not exist with provided email and password combination."
            );
    }
    const validPassword = await bcrypt.compare(userCredentials.password, user.password);
    if (!validPassword) {
        console.log("Incorrect password")
        return res.status(400).send("Incorrect Password");
    }
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    console.log(user.toJSON());
    return res.send({name: user.name, token: accessToken});
});

router.get("/", async (req, res) => {
    res.json({ message: "This is the login route!" });
});

module.exports = router;