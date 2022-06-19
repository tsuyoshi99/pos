const { notFound, validationError } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const Product = require('./model')
const { toDTO } = require('./dto')

const index = async ({ query }, res, next) => {
  try {
    const result = await Product.findAndCountAll({
      where: toWhere(query.filter, ['name', 'description', 'price']),
      order: toOrder(query, ['name', 'description', 'price']),
      ...toLimitAndOffset(query)
    })

    return success(res)({
      total: result.count,
      limit: query.limit,
      page: query.page,
      data: result.rows.map((row) => toDTO(row))
    })
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
