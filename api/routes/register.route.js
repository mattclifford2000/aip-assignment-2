const express = require("express");
var router = express.Router();
const { verifyLoginUser, verifyRegisterUser } = require("../helpers/validator");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");


router.post("/", async (req, res) => {
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var dateofbirth = req.body.dateofbirth;
    var body = { name: name, email: email, password: password, dateofbirth: dateofbirth };
    console.log("Successful POST register.");
    try {
        console.log(body);
        const { error } = verifyRegisterUser(body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send(err.message);

    }
    const emailExists = await User.exists({ email: body.email });
    if (emailExists)
        return res.status(409).send("A user exists with this email.");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    var newRole = "user";
    if (body.email.includes("@favourcentre.com.au")) {
        newRole = "admin";
    }
    const user = new User({
        name: body.name,
        email: body.email,
        password: hashPassword,
        dateofbirth: body.dateofbirth,
        role: newRole,
        score: body.score,
        debits: body.debits,
        credits: body.credits,
        requests: body.requests,
    });
    const savedUser = await user.save();
    console.log(savedUser);
    return res.status(200).send(savedUser);
});

//For testing API purposes
router.get("/", async (req, res) => {
    res.json({ message: "This is the register route!" });
});

module.exports = router;