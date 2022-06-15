const { Op } = require('sequelize')

const identity = (v) => v
const arrayHave = (v) => {
  return v.split(' ').map((v) => {
    return isNaN(v) ? `{${v}}` : v
  })
}

const deepPropSet = (obj, dotPath, key, val) => {
  const props = dotPath.split('.')
  let here = obj
  props.forEach((prop, i) => {
    here = here[prop] = here[prop] || {}
  })
  here[key] = val
}

const getOperators = () => {
  const identityOps = {
    valFunc: identity,
    ops: [
      'gt',
      'gte',
      'lt',
      'lte',
      'ne',
      'eq',
      'not',
      'like',
      'notLike',
      'iLike',
      'notILike'
    ]
  }
  const arrayHaveOps = {
    valFunc: arrayHave,
    ops: [
      'or',
      'in',
      'notIn',
      'overlap',
      'contains',
      'contained',
      'between',
      'notBetween'
    ]
  }
  const resultMap = {}
  for (const opSet of [identityOps, arrayHaveOps]) {
    for (const op of opSet.ops) {
      resultMap[op] = {
        op: Op[op],
        valFunc: opSet.valFunc
      }
    }
  }

  return resultMap
}

module.exports = { deepPropSet, getOperators }
