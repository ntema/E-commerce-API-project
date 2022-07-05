const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique:  true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin","moderator","secretary"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)