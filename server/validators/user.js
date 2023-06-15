const Joi = require("joi");

const validateUser = (data) => {
  const schema = Joi.object({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(data);
};

module.exports = validateUser;
