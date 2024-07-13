const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 8000;
const User = require("./models/User");
const authRoutes= require("./routes/Auth")
const songRoutes = require("./routes/Song")
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const playlistRoutes = require("./routes/Playlist")

app.use(express.json());  


mongoose.connect("mongodb+srv://iamgaurav345:gaurav345@cluster0.guqlmjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((x) => {
    console.log("Connected to MongoDB!");
})
.catch((err) => {
    console.error("Error while connecting to MongoDB:", err);
});

//setup passport-jwt



const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'gaurav345',
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findOne({ id: jwt_payload.sub });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("App is running at port " + port);
});
