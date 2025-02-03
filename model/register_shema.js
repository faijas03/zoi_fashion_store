const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const { type } = require("os")


const registeruser=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
        enum: ['male', 'female', 'other'],
    }
})

const registerschema=mongoose.model("registeredusers",registeruser)

module.exports=registerschema
