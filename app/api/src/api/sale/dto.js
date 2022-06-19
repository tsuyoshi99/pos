const toDTO = (sale) => {
  return {
    id: sale.id,
    items: sale.products.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.salesProducts.price,
      quantity: item.salesProducts.quantity
    })),
    total: sale.products.reduce((total, item) => {
      total +=
        parseFloat(item.salesProducts.price) *
        parseFloat(item.salesProducts.quantity)

      return total
    }, 0),
    userId: sale.userId
  }
}

module.exports = { toDTO }
