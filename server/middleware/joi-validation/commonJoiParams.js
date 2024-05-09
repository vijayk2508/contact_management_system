const Joi = require("joi");
const { SanitizedJoiString } = require("../../config/joi-validation/jVHelper");

const phone_number = Joi.string()
  .custom((value, helpers) => {
    if (!/^\d+$/.test(value)) {
      return helpers.error("any.invalid");
    }

    if (value.length !== 10) {
      return helpers.error("string.length", { limit: 10 });
    }

    return value;
  })
  .messages({
    "any.invalid": "Phone number is not valid",
    "string.length": "Phone number must be exactly {#limit} characters long",
  });

const phone_number_prefix = SanitizedJoiString.pattern(/^\+\d{1,3}$/).messages({
  "string.pattern.base": "Phone number prefix is not valid",
});

const commonJoiParams = {
  name: SanitizedJoiString,
  email: Joi.string().email().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  phone_number,
  phone_number_prefix,
  imageURL: SanitizedJoiString,
  about: SanitizedJoiString.max(370).min(100).messages({
    "string.min": "About must be at least 100 characters long",
    "string.max": "About cannot exceed 370 characters",
    "any.required": "About is required",
  }),
  address: SanitizedJoiString.max(100).messages({
    "string.max": "Address cannot exceed 100 characters",
    "any.required": "Address is required",
  }),
  id: Joi.string().required().messages({
    "any.required": "Contact detail id is required",
  }),
};

module.exports = commonJoiParams;
