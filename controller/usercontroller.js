const bcrypt=require("bcrypt")
const registerschema=require("../model/register_shema");
const validation = require("./validation")
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
        gender
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
        const hashedpassword = await bcrypt.hash(password,10)
        const newuser = await registerschema({
            name, email, password: hashedpassword, username, phone, gender
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





const otpstore = {}

function generateotp(){
    return crypto.randomInt(100000, 999999).toString();
}

exports.forgetpasswordverify = async (req,res) =>{
    const {email} = req.body
    try {
        const userfound = await registerschema.findOne({ email })
        if(!userfound) return res.status(400).json({message:"Unable to find user"})

            const otp = generateotp()
            const expiresat = Date.now() + 10 * 60 * 1000;
            otpstore[email]={otp,expiresat}
            console.log(otpstore);
            

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'blackmailde@gmail.com',
                    pass: 'pptw zkal eilj oiar',
                },
            });
    
            const mailOptions = {
                from: 'blackmailde@gmail.com',
                to: email,
                subject: 'Your OTP for Password Reset',
                text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
            };
    
            await transporter.sendMail(mailOptions);
            res.status(200).json({message:"otp send to your email ", email: email})    
    } catch (error) {
        console.error('Error in sendotp:', error);
        res.status(500).json({ message: "Error sending OTP", email: email});
    }

}


exports.forgetpasswordupdated = async (req,res)=>{
    const { otp, password, confirmpassword, email } = req.body;

    try {
        console.log(otpstore[email]);
        const otpentry = otpstore[email]
        
        console.log(otpstore[email]);
        
        
        if(!otpentry) return res.status(400).json({error:"invalid ot or email"})
        const { otp:sendotp,expiresAt } = otpentry
    
        if (Date.now() > expiresAt) {
            delete otpstore[email];
            return res.status(400).json({ error: "OTP expired" });
        }

        if (sendotp !== otp) {
            return res.status(400).json( { error: "Invalid OTP" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json( { error: "Passwords do not match" });
        }

        const passwordhashed = await bcrypt.hash(password, 10);
        await registerschema.updateOne({ email }, { password: passwordhashed });

        delete otpstore[email];

        res.status(200).json({message:"new password set succesfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"unable to update password"})
        
    }
}

