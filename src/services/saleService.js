const { salesModel } = require('../models');
const { getById } = require('./productService');

async function createNewSale(newSale) {
  const verifyProduct = Promise.all(newSale.map(async (sale) => {
    const exist = await getById(sale.productId);
    if (exist.type === 404) return true;
    return false;
  }));

  if ((await verifyProduct).includes(true)) return { type: 404, message: 'Product not found' };
  const createdSale = await salesModel.createNewSale(newSale);
  
  return { type: null, message: createdSale };
}

async function getAllSales() {
  const listSales = await salesModel.getAllSales();

  return { type: null, message: listSales };
}

module.exports = {
  createNewSale,
  getAllSales,
};