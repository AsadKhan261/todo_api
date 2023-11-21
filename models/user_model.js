const db = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "userName can't be empty"],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
   
},{timestamps:true});

// used while encrypting user entered password
userSchema.pre("save",async function(){
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }catch(err){
        throw err;
    }
});


const UserModel = db.model('user',userSchema);
module.exports = UserModel;