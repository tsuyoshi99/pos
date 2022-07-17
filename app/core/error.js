const error = {
  // auth and user section
  userAlreadyExist: {
    name: "USER_ALREADY_EXIST",
    description: "user with provided email already exist",
  },
  userNoPassword: {
    name: "USER_NO_PASSWORD",
    description: "user need to set password first",
  },
  incorrectEmailPassword: {
    name: "INCORRECT_EMAIL_PASSWORD",
    description: "no matched user based on the provided email and password",
  },
  forbidden: {
    name: "FORBIDDEN",
    description: "you're not allowed to access these resources",
  },
  // product section
  saleInvalidItem: {
    name: "SALE_INVALID_ITEM",
    description: "check each item",
  },
  saleInvalidForms: {
    name: "PRODUCT_INVALID_FORMS",
    description: "check each item quantity",
  },
  saleOutOfStock: {
    name: "PRODUCT_OUT_OF_STOCK",
    description: "check each item quantity",
  },
  // get request section
  filterInvalidExpression: {
    name: "FILTER_INVALID_EXPRESSION",
  },
  filterInvalidField: {
    name: "FILTER_INVALID_FIELD",
  },
  filterInvalidOperator: {
    name: "FILTER_INVALID_OPERATOR",
  },
};

module.exports = { error };
