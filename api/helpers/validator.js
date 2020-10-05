const Joi = require("@hapi/joi");

var today = new Date();

//Some mismatch exists between the frontend and backend email checker
const verifyRegisterUser = (user) => {
  const schema = Joi.object({
      //Does not filter for symbols or numbers in name
      //as using alphanum() param disallows spaces.
    name: Joi.string().min(6).max(36).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    dateofbirth: Joi.date(),
    role: Joi.string().allow(""),
    score: Joi.number(),
    debits: Joi.array(),
    credits: Joi.array(),
    requests: Joi.array(),
  });
  return schema.validate(user);
};

const verifyLoginUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(user);
};

module.exports.verifyRegisterUser = verifyRegisterUser;
module.exports.verifyLoginUser = verifyLoginUser;
