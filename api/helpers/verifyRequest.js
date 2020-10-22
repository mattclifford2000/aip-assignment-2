const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const verifyRequest = (request) => {
  console.log("Request: ");
  console.log(request);
  const schema = Joi.object()
    .keys({
      ownerID: Joi.objectId(),
      ownerName: Joi.string(),
      name: Joi.string().min(6),
      content: Joi.string().min(6),
      completed: Joi.boolean(),
      chocolates: Joi.number(),
      mints: Joi.number(),
      pizzas: Joi.number(),
      coffees: Joi.number(),
      candies: Joi.number(),
    })
    .unknown(true);
  console.log(schema.validate(request));
  return schema.validate(request);
};

module.exports.verifyRequest = verifyRequest;
