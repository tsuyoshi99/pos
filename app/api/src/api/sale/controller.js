const { notFound } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const Sale = require('./model')
const { toDTO } = require('./dto')
const { Product, Inventory } = require('../product/model')
const User = require('../user/model')
const sequelize = require('../../services/sequelize')
const core = require('core')
const { HttpError } = require('../../utils/httpError')

const index = async ({ query }, res, next) => {
  try {
    const result = await Sale.findAndCountAll({
      where: toWhere(query.filter, ['id', 'createdAt']),
      order: toOrder(query, ['id', 'createdAt']),
      ...toLimitAndOffset(query),
      include: [Product, User]
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

const create = async ({ body, user }, res, next) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const sale = await Sale.create({ userId: user.id }, { transaction: t })

      const products = []
      // validate each item
      for (const item of body.items) {
        const product = await Product.findByPk(
          item.productId,
          {
            include: Inventory
          },
          { transaction: t }
        )

        if (!product) {
          throw new HttpError(400, core.error.saleProductNotFound)
        }

        const [ok, err] = core.sale.validation.validateSaleItems(product, item)

        if (err) {
          throw new HttpError(400, err)
        }

        if (!ok) {
          throw new HttpError(400, core.error.saleInvalidItem)
        }

        products.push(product)
      }

      // deduct inventory
      for (const [i, product] of products.entries()) {
        const inventory = await product.getInventory({ transaction: t })

        await inventory.update(
          {
            quantity:
              parseFloat(product.inventory.quantity) -
              core.product.toSingleLevel(product.forms, body.items[i].quantity)
          },
          { transaction: t }
        )
      }

      // assign all the product
      for (const [itemIndex, item] of body.items.entries()) {
        await sale.addProduct(item.productId, {
          through: {
            quantity: item.quantity.map((form, formIndex) => {
              return {
                price: products[itemIndex].forms[formIndex].price,
                ...form
              }
            })
          },
          transaction: t
        })
      }

      return sale
    })

    const sale = await Sale.findByPk(result.id, { include: [Product, User] })

    return success(res, 201)({ data: toDTO(sale) })
  } catch (error) {
    return next(error)
  }
}

const destroy = ({ params: { id } }, res, next) =>
  Sale.findByPk(id)
    .then(notFound(res))
    .then((sale) => (sale ? sale.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, destroy }
