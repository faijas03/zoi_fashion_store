const bcrypt=require("bcrypt")
const registerschema=require("../model/register_schema");
const validation = require("../validation/registervalidation")
const dotenv = require("dotenv")
const jwt=require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const { abort } = require("process");
const { error } = require("console");

dotenv.config()

exports.registered=async(req,res)=>{
    const {
        name,
        email,
        password,
        confirmpassword,
        username,
        phone,
        gender,
        role
    } = req.body;
    
    try {
        const { error } = validation.validatedata.validate(req.body,{abortEarly:false})
        if(error){
            return res.status(400).json({errors:error.details.map( (err) => err.message ) })
        }
        const existinguser = await registerschema.findOne({ email })
        if(existinguser){
            return res.status(400).json({message:"Email already registed"})
        }
        const existingphone = await registerschema.findOne({ phone })
        if(existingphone){
            return res.status(400).json({message:"Phone number already exist"})
        }
        const existingusername = await registerschema.findOne({ username })
        if(existingusername){
            return res.status(400).json({message:"username already exist"})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const newuser = await registerschema({
            name, email, password: hashedpassword, username, phone, gender,role
        });
        await newuser.save()
        res.status(200).json({message:"registered successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}


exports.logined = async (req,res) =>{
    const{username,password}=req.body
    try {
        const user = await registerschema.findOne({ username })
        if(!user) return res.status(400).json({error:"user not found"})
    
        const checkpassword = await bcrypt.compare(password,user.password)
        if(!checkpassword) return res.status(400).json({error:"Incorrect password"}) 
        
        const token=jwt.sign({ userId: user._id },process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRATION})    
        
        res.status(200).send(`${token} logined succesfully`)
    } catch (error) {
        return res.status(400).json({error:"Failed to login"})
    }  
}




