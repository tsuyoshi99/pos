const toDTO = (sale) => {
  return {
    id: sale.id,
    items: sale.products.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: parseFloat(item.salesProducts.price),
      quantity: parseFloat(item.salesProducts.quantity)
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
