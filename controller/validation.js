const Joi = require("joi");
const jwt = require("jsonwebtoken")

exports.validatedata=Joi.object({
    name:Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(15)
    .required()
    .messages({
        "string.pattern.base":"Name can only contain alphabets and spaces",
        "string.min":"Name must be atleast 3 characters",
        "string.max":"Name must be no more than 15 characters",
        "string.empty":"Name is required"
    }),
   
   email:Joi.string()
    .email()
    .required()
    .messages({
        "string.email":"Email must be a valid email address",
        "string.empty":"Email is required"
    }),

   password:Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)
    .required()
    .messages({
        "string.pattern.base":"Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
        "string.empty":"Password required"
    }),

   confirmpassword:Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
        "any.only":"Confirm password must match the password",
        "string.empty":"Confirm password required"
    }),

   username:Joi.string()
    .required()
    .messages({
        "string.empty":"Username requires"
    }),
   
   phone:Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
        "string.pattern.base":"Phone number must be exactly 10 digits",
        "string.empty":"Phone number required"
    }),

   gender:Joi.string()
   .required()
   .messages({
        "string.empty":"gender is required"
   }) 
})


exports.jwtvalidation=(req,res,next)=>{
    const authHeader = req.header("Authorization");
    // const token = req.header("Authorization")

    if(!authHeader) return res.status(401).json({error:"No token provided"})

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
        if(!token) return res.status(401).json({error:"invalid token format"})


        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user=decoded
            console.log(req.user)
            console.log("jwt done")
            next()
        } catch (error) {
            res.status(403).json({error:"invalid token"})
        }
}


exports.validateupdateprofile = Joi.object({
    name:Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(15)
    .optional()
    .messages({
        "string.pattern.base":"Name can only contain alphabets and spaces",
        "string.min":"Name must be atleast 3 characters",
        "string.max":"Name must be no more than 15 characters",
        
    }),

   username:Joi.string()
    .optional()
    .messages({
        
    }),
   
   phone:Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .messages({
        "string.pattern.base":"Phone number must be exactly 10 digits",
        
    }),

   gender:Joi.string()
    .optional()
    .messages({
        
   }), 
   
   street:Joi.string()
    .optional()
    .messages({
      
   }),

   city:Joi.string()
    .optional()
    .messages({
        
   }),

   state:Joi.string()
   .optional()
   .messages({
       
  }),

  postal:Joi.string()
   .optional()
   .pattern(/^\d{6}$/)
   .messages({
    
       "string.pattern.base":"postal must be exactly 6 digits",
     
  }),

})

