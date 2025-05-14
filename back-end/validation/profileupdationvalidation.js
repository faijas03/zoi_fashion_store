const Joi = require("joi");

exports.validateupdateprofile = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(15)
    .optional()
    .messages({
      "string.pattern.base": "Name can only contain alphabets and spaces",
      "string.min": "Name must be atleast 3 characters",
      "string.max": "Name must be no more than 15 characters",
    }),

  username: Joi.string().optional().messages({}),

  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits",
    }),

  gender: Joi.string().optional().messages({}),

  street: Joi.string().optional().messages({}),

  city: Joi.string().optional().messages({}),

  state: Joi.string().optional().messages({}),

  postal: Joi.string()
    .optional()
    .pattern(/^\d{6}$/)
    .messages({
      "string.pattern.base": "postal must be exactly 6 digits",
    }),
});
