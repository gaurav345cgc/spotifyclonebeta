const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/Playlist");

router.post("/create",
    passport.authenticate("jwt", { session: false }),
    async (req,res) => {
        const currentUser = req.user;
        const {name, thumbnail, songs} = req.body;
        if(!name || !thumbnail || songs)
        {
            return res.status(301).json({error: "Please fill all the fields."});
        }
        const playlistData = {
            name,
            thumbnail,
            songs,
            owner: currentUser._id,
            collaborators: [],
        };
        const playlist = await Playlist.create(playlistData);
        return res.status(200).json(playlist);
    }
)