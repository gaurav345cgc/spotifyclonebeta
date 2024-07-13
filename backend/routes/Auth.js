const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers.js");  // Ensure this is correct

router.post("/register", async (req, res) => {
    const { email, password, firstname, lastname, username } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
        return res.status(403).json({ error: "A User Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = { email, password: hashedPassword, firstname, lastname, username };
    const newUser = await User.create(newUserData);

    const token = await getToken(email, newUser);

    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login",async(req,res) => {
    const { email, password} = req.body;

    const user = await User.findOne({email: email});
    if(!user){
        return res.status(403).json({err: "Invalid Credentials"});
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if(!isPasswordvalid)
    {
        return res.status(403).json({err: "Invalid Credentials"});
    }
    if(isPasswordvalid)
    {
        const token = await getToken(email, user);
        const userToReturn = { ...user.toJSON(), token };
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
    }
});

module.exports = router;
