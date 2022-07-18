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
  // sale section
  saleInvalidItem: {
    name: "SALE-INVALID_ITEM",
    description: "check each item",
  },
  saleProductNotFound: {
    name: "SALE-PRODUCT_NOT_FOUND",
    description: "product not found",
  },
  saleInvalidForms: {
    name: "SALE-INVALID_FORMS",
    description: "check each item quantity",
  },
  saleOutOfStock: {
    name: "SALE-OUT_OF_STOCK",
    description: "check each item quantity",
  },
  // get request section
  filterInvalidExpression: {
    name: "FILTER-INVALID_EXPRESSION",
  },
  filterInvalidField: {
    name: "FILTER-INVALID_FIELD",
  },
  filterInvalidOperator: {
    name: "FILTER-INVALID_OPERATOR",
  },
};

module.exports = { error };
