const { notFound, validationError } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const Order = require('./model')

const index = ({ query }, res, next) =>
  Order.findAndCountAll({
    where: toWhere(query.filter, ['name']),
    order: toOrder(query, ['name']),
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
  Order.create(body)
    .then(success(res, 201))
    .catch(validationError(res))
    .catch(next)

const update = ({ body }, res, next) =>
  Order.update(body).then(success(res)).catch(next)

const destroy = ({ params: { id } }, res, next) =>
  Order.findByPk(id)
    .then(notFound(res))
    .then((order) => (order ? order.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, update, destroy }
