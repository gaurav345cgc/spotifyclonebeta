const mongoose = require("mongoose");

const user =new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    likedSong:{
        type: String,
        default:"",
    },
    likedPlaylists:{
        type: String,
        default:"",
    },
    subscribedArtists:{
        type: String,
        default:"",
    },
});

const UserModel = mongoose.model("User",user);

module.exports = UserModel; 