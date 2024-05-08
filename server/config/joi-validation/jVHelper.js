const Joi = require("joi");
const { escape } = require("lodash");

const SanitizedJoiString = Joi.string().custom((value, helpers) => {
  // Consider using a different function for HTML escaping, if that's the intention
  const sanitizedValue = escape(value);
  if (sanitizedValue !== value) {
    return helpers.error("any.invalid", {
      message: "The value must be a valid string",
      code: "invalidString",
    });
  }
  return sanitizedValue;
});


module.exports = { SanitizedJoiString };
