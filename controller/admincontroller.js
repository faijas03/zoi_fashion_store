const bcrypt=require("bcrypt")
const registerschema=require("../model/register_schema");
const jwt=require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

exports.adminlogined = async (req,res) =>{
    const{username,password}=req.body
    try {
        
        const user = await registerschema.findOne({ username })
        if(!user) return res.status(400).json({error:"user not found"})
            const checkpassword = await bcrypt.compare(password,user.password)
        if(!checkpassword) return res.status(400).json({error:"Incorrect password"}) 

        if(user.role === !"admin") return res.status(404).json({error:"user not a admin"}) 
        
        
        const token=jwt.sign({ userId: user._id },process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRATION})    
        
        res.status(200).send(`${token} , admin logged succesfully`)
   
    
    } catch (error) {
        return res.status(400).json({error:"Failed to login"})
    }  
}

