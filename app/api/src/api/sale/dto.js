const toDTO = (sale) => {
  return {
    id: sale.id,
    items: sale.products.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.sales_products.price,
      quantity: item.sales_products.quantity
    })),
    total: sale.products.reduce((total, item) => {
      total +=
        parseFloat(item.sales_products.price) *
        parseFloat(item.sales_products.quantity)

      return total
    }, 0),
    userId: sale.userId
  }
}

module.exports = { toDTO }
