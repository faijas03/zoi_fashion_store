const Joi = require("joi");

exports.validateaddress = Joi.object({

   street:Joi.string()
    .required()
    .messages({
      
   }),

   city:Joi.string()
    .required()
    .messages({
        
   }),

   state:Joi.string()
   .required()
   .messages({
       
  }),

  postal:Joi.string()
   .required()
   .pattern(/^\d{6}$/)
   .messages({
    
       "string.pattern.base":"postal must be exactly 6 digits",
     
  }),

})

