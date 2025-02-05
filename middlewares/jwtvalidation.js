const { error } = require("console");
const jwt = require("jsonwebtoken");
const { set } = require("mongoose");
const blacklist = new Set()

exports.jwtvalidation=(req,res,next)=>{
    const authHeader = req.header("Authorization");
    

    if(!authHeader) return res.status(401).json({error:"No token provided"})

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
        
        if(!token) return res.status(401).json({error:"invalid token format"})

        if(blacklist.has(token)) return res.status(403).json({error:"Token is black listed login again"})    

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user=
            {
                userId : decoded.userId,
                token
            }
            console.log("jwt done")
            next()
        } catch (error) {
            res.status(403).json({error:"invalid token"})
        }
}

exports.blacklist=blacklist

