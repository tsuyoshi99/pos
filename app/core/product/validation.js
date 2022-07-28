const Joi = require("joi");

exports.create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number(),
  forms: Joi.array()
    .ordered(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        coefficient: Joi.number().valid(1).default(1),
      })
    )
    .items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        coefficient: Joi.number().required(),
      })
    )
    .min(1)
    .max(10)
    .required(),
  inventory: Joi.array()
    .items(
      Joi.object({
        quantity: Joi.number().required(),
      })
    )
    .min(1)
    .max(10)
    .required(),
});

exports.update = {
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  forms: Joi.array()
    .ordered(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        coefficient: Joi.number().allow(1).default(1),
      })
    )
    .items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        coefficient: Joi.number().required(),
      })
    )
    .min(1)
    .max(10),
  inventory: Joi.array()
    .ordered(
      Joi.object({
        quantity: Joi.number().required(),
      })
    )
    .items(
      Joi.object({
        quantity: Joi.number().required(),
      })
    )
    .min(1)
    .max(10)
    .required(),
};
