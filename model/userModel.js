const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        require:[true, "please enter user name"]
    },
    email:{
        type: String,
        require:[true, "please enter email"],
        // unique:[true, "email is already in use"]
    },
    password:{
        type: String,
        require:[true, "please enter password"]
    },


},{ timestamps: true, collection: 'user' });


 module.exports = mongoose.model("users", userSchema);