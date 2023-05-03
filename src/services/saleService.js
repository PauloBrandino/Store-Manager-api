const { salesModel } = require('../models');
const { getById } = require('./productService');

const verifyProduct = (product) => Promise.all(product.map(async (prodt) => {
  const exist = await getById(prodt.productId);
  if (exist.type === 404) return true;
  return false;
}));

async function createNewSale(newSale) {
  if ((await verifyProduct(newSale))
    .includes(true)) return { type: 404, message: 'Product not found' };
  const createdSale = await salesModel.createNewSale(newSale);
  
  return { type: null, message: createdSale };
}

async function getAllSales() {
  const listSales = await salesModel.getAllSales();

  return { type: null, message: listSales };
}

async function getSaleById(id) {
  const getSale = await salesModel.getSaleById(id);

  if (getSale.length === 0) return { type: 404, message: 'Sale not found' };

  return { type: null, message: getSale };
}

async function deleteSale(id) {
  const { type, message } = await getSaleById(id);

  if (type) return { type, message };
  const deletedSale = await salesModel.deleteSale(id);

  return deletedSale;
}

async function updateSale(saleId, infoToUpdate) {
  const verifySale = await salesModel.getSaleById(saleId);

  if ((await verifyProduct(infoToUpdate))
    .includes(true)) return { type: 404, message: 'Product not found' };
  if (verifySale.length === 0) return { type: 404, message: 'Sale not found' };
  
  infoToUpdate.forEach(async (info) => (
    await salesModel.updateSale(info)
  ));

  return { type: null, message: { saleId, itemsUpdated: infoToUpdate } };
}

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};