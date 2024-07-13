const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient Detail to create Song" });
    }
    const artist = req.user._id;
    const songDetails = new Song({ name, thumbnail, track, artist });
    const createdSong = await Song.create(songDetails);
    return res.status(200).json({ song: createdSong });
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const songs = await Song.find({ artist: req.user._id });
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/artist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.body;
    const artist = await User.find({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist not found" });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

router.get(
    "/get/songname",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { songName } = req.body;
        const songs = await Song.find({ name: songName });
        return res.status(200).json({ data: songs });
  }
);
module.exports = router;
