const Joi = require("joi");

exports.validateproductschema = Joi.object({
  productname: Joi.string().required().messages({
    "string.empty": "product name is required",
  }),
  price: Joi.number().required().messages({
    "any.required": "price is required",
  }),
  category: Joi.string().required().messages({
    "string.empty": "category is required",
  }),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
});
