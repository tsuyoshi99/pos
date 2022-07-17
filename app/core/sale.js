const { error } = require("./error");
const Joi = require("joi");
const { toSingleLevel } = require("./product");

const create = {
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().required(),
        quantity: Joi.array()
          .items(
            Joi.object({
              price: Joi.number(),
              quantity: Joi.number().required(),
            })
          )
          .min(1)
          .max(10)
          .required(),
        price: Joi.number().required(),
      }).required()
    )
    .min(1),
};

const validateSaleItems = (product, requestedProduct) => {
  // validate forms
  if (product.forms.length !== requestedProduct.quantity.length) {
    return [false, error.saleInvalidForms];
  }

  // validate quantity
  const quantity = toSingleLevel(product.forms, requestedProduct.quantity);
  if (quantity > product.inventory.quantity) {
    return [false, error.saleOutOfStock];
  }

  return [true, null];
};

const calculateTotal = (forms, multiLevel) => {
  return multiLevel.reduce((total, level, i) => {
    total += (level.price ? level.price : forms[i].price) * level.quantity;

    return total;
  }, 0);
};

module.exports = { validation: { create, validateSaleItems }, calculateTotal };
