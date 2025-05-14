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
  size: Joi.alternatives()
    .try(
      Joi.string().trim().uppercase().min(1), // single size like "M"
      Joi.array().items(Joi.string().trim().uppercase().min(1)), // array of sizes like ["S", "XXL"]
    )
    .required()
    .messages({
      "any.required": "size is required",
    }),
});
