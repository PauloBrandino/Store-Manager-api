const { productModel } = require('../models');

async function getAll() {
  const products = await productModel.getAll();

  return { type: null, message: products };
}

async function getById(id) {
  const productById = await productModel.getById(id);
  if (!productById) return { type: 404, message: 'Product not found' };

  return { type: null, message: productById };
}

async function createProduct(product) {
  const createdProduct = await productModel.createProduct(product);

  return { type: null, message: createdProduct };
}

module.exports = {
  getAll,
  getById,
  createProduct,
};