const { toSingleLevel, toMultiLevel } = require("./logic");
const { create, update } = require("./validation");

module.exports = {
  toSingleLevel,
  toMultiLevel,
  validation: { create, update },
};
