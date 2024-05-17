const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    salutation:{
        type: String,
        required: [true, "please enter the name"]
    },
    firstName: {
     type: String,
    required: [true, "please enter the name"]
    },
    lastName: {
        type: String,
       required: [true, "please enter the email"]
    },
    email: {
        type: String,
       required: [true, "please enter the name"]
       },
      
    phone: {
     type: String,
    required: [true, "please enter the name"]
    },
    dob: {
        type: String,
       required: [true, "please enter the name"]
       },
    address: {
        type: String,
       required: [true, "please enter the name"]
       },
    city:{
        type: String,
        required: [true, "please enter the name"]
    },
    state: {
     type: String,
    required: [true, "please enter the name"]
    },
    country: {
        type: String,
       required: [true, "please enter the email"]
    },
    gender: {
        type: String,
       required: [true, "please enter the name"]
       },
       qualifications: {
        type: String,
       required: [true, "please enter the email"]
    },
    password: {
        type: String,
       required: [true, "please enter the name"]
       },
       avatar: {
        type: String,
      
       }
},{ timestamps: true, collection: 'employees' });

module.exports = mongoose.model("user", empSchema);