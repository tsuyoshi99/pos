const { notFound, validationError } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const Product = require('./model')

const index = ({ query }, res, next) =>
  Product.findAndCountAll({
    where: toWhere(query.filter, ['name', 'price']),
    order: toOrder(query, ['name', 'price']),
    ...toLimitAndOffset(query)
  })
    .then((result) => ({
      total: result.count,
      limit: query.limit,
      page: query.page,
      data: result.rows
    }))
    .then(success(res))
    .catch(next)

const create = ({ body }, res, next) =>
  Product.create(body)
    .then(success(res, 201))
    .catch(validationError(res))
    .catch(next)

const update = ({ body }, res, next) =>
  Product.update(body).then(success(res)).catch(next)

const destroy = ({ params: { id } }, res, next) =>
  Product.findByPk(id)
    .then(notFound(res))
    .then((product) => (product ? product.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, update, destroy }
