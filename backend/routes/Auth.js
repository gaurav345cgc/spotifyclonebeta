const express = require("express");
const router = express.Router();
const User= require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils")
router.post("/register", async(req,res) => {
    const {email, password, firstname,lastname, username} = req.body;

    const user = await User.findOne({email: email});
    if(user)
    {
        return res.status(403).json({error: "A User Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {email, password : hashedPassword, firstname,lastname,username};
    const newUser = await User.create(newUserData);

    const token = await getToken(email, newUser);

    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});