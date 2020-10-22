const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const verifyRequest = (request) => {
  console.log("Request: ");
  console.log(request);
  const schema = Joi.object({
    ownerID: Joi.objectId(),
    ownerName: Joi.string().min(6).max(36),
    name: Joi.string().min(6),
    content: Joi.string().min(6),
    completed: Joi.boolean().invalid(true),
    chocolates: Joi.number(),
    mints: Joi.number(),
    pizzas: Joi.number(),
    coffees: Joi.number(),
    candies: Joi.number(),
  });
  console.log(schema.validate(request));
  return schema.validate(request);
};
