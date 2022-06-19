const { notFound, validationError } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const Product = require('./model')
const { toDTO } = require('./dto')

const index = ({ query }, res, next) => {
  try {
    Product.findAndCountAll({
      where: toWhere(query.filter, ['name']),
      order: toOrder(query, ['name']),
      ...toLimitAndOffset(query)
    })
      .then((result) => ({
        total: result.count,
        limit: query.limit,
        page: query.page,
        data: result.rows.map((row) => toDTO(row))
      }))
      .then(success(res))
      .catch(next)
  } catch (error) {
    return next(error)
  }
}

const create = ({ body }, res, next) =>
  Product.create(body)
    .then((product) => {
      return { data: toDTO(product) }
    })
    .then(success(res, 201))
    .catch(validationError(res))
    .catch(next)

const update = ({ body, params: { id } }, res, next) =>
  Product.update(body, { where: { id: +id }, returning: true })
    .then(([_, [product]]) => {
      return { data: toDTO(product) }
    })
    .then(success(res))
    .catch(next)

const destroy = ({ params: { id } }, res, next) =>
  Product.findByPk(id)
    .then(notFound(res))
    .then((product) => (product ? product.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, update, destroy }
