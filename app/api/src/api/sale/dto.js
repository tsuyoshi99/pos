const core = require('core')
const { toDTO: toUserDTO } = require('../user/dto')

const toDTO = (sale) => {
  return {
    id: sale.id,
    items: sale.products.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      quantity: item.salesProducts.quantity.map((level, i) => {
        return { ...level, name: item.forms[i].name }
      })
    })),
    total: sale.products.reduce((total, item) => {
      total += core.sale.calculateTotal(item.forms, item.salesProducts.quantity)

      return total
    }, 0),
    createdAt: sale.createdAt,
    user: toUserDTO(sale.user)
  }
}

module.exports = { toDTO }
