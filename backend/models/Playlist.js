const mongoose = require("mongoose");

const playlist =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail :{
        type:String,
        required:true,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    songs:
    [
        {
        type:  mongoose.Types.ObjectId,
        ref:"song",
        },
    ],
    collabarators:[{
        type:  mongoose.Types.ObjectId,
        ref:"user",
        },
    ],
});

const PlaylistModel = mongoose.model("playlist",playlist);

module.exports = PlaylistModel; 