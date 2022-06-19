const { notFound, validationError } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const Sale = require('./model')
const { toDTO } = require('./dto')
const { Product } = require('../product/model')

const index = async ({ query }, res, next) => {
  try {
    const result = await Sale.findAndCountAll({
      where: toWhere(query.filter, ['createdAt']),
      order: toOrder(query, ['createdAt']),
      ...toLimitAndOffset(query),
      include: Product
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

const create = async ({ body, user }, res, next) =>
  Sale.create({ userId: user.id }, { include: Product })
    .then(async (sale) => {
      const addingProducts = body.items.map((item) => {
        return sale.addProduct(item.id, {
          through: { quantity: item.quantity, price: item.price }
        })
      })

      await Promise.all(addingProducts)

      return sale
    })
    .then((sale) => Sale.findByPk(sale.id, { include: Product }))
    .then(toDTO)
    .then(success(res, 201))
    .catch(validationError(res))
    .catch(next)

const destroy = ({ params: { id } }, res, next) =>
  Sale.findByPk(id)
    .then(notFound(res))
    .then((sale) => (sale ? sale.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, destroy }
