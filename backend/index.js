const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 8000;
const User = require("./models/User")
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");


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



let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'gaurav345';
passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("App is running at port " + port);
});
