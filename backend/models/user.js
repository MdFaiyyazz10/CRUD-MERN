const mongoose = require('mongoose')
// import mongoose from "mongoose";


//create schema // user is schema i.e. userSchema = ...
const user = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type:String,
        unique: true,
        required: true
    },
    age: {
        type: Number
    },
    
},{ timestamps: true})

//Create Model here User is Model userModel
const User = mongoose.model('User',user)

module.exports = User;
// export default User