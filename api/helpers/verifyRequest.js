const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const verifyRequest = (request) => {
  const minAmount = -1;
  console.log("Request: ");
  console.log(request);
  const schema = Joi.object()
    .keys({
      ownerName: Joi.string(),
      name: Joi.string().min(6),
      content: Joi.string().min(6),
      completed: Joi.boolean(),
      chocolates: Joi.number().greater(minAmount),
      mints: Joi.number().greater(minAmount),
      pizzas: Joi.number().greater(minAmount),
      coffees: Joi.number().greater(minAmount),
      candies: Joi.number().greater(minAmount),
    })
    .unknown(true);
  console.log(schema.validate(request));
  return schema.validate(request);
};

module.exports.verifyRequest = verifyRequest;
