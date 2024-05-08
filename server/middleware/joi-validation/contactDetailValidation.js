const Joi = require("joi");
const commonJoiParams = require("./commonJoiParams");

const createContactDetailValidation = (req, res, next) => {
  const schema = Joi.object({
    name: commonJoiParams.name.required(),
    email: commonJoiParams.email.required(),
    phone_number: commonJoiParams.phone_number.required(),
    phone_number_prefix: commonJoiParams.phone_number_prefix.required(),
    description: commonJoiParams.description.required(),
    address: commonJoiParams.address.required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const updateContactDetailValidation = (req, res, next) => {
  const schema = Joi.object(commonJoiParams);

  const { error } = schema.validate({ ...req.body, ...req.params });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const getAllContactDetailValidation = (req, res, next) => {
  const schema = Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(15),
    skip: Joi.number().integer().min(0).default(0),
    search: Joi.string().trim().allow("").max(30),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const deleteContactDetailValidation = (req, res, next) => {
  const schema = Joi.object({
    id: commonJoiParams.id,
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = {
  createContactDetailValidation,
  updateContactDetailValidation,
  getAllContactDetailValidation,
  deleteContactDetailValidation,
};
