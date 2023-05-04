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

async function updateProduct(id, product) {
  const productById = await productModel.getById(id);

  if (!productById) return { type: 404, message: 'Product not found' };
  const updatedProduct = await productModel.updateProduct(id, product);

  return { type: null, message: updatedProduct };
}

async function deleteProduct(id) {
  const productById = await productModel.getById(id);
  if (!productById) return { type: 404, message: 'Product not found' };
  
  const deletedProduct = await productModel.deleteProduct(id);

  return deletedProduct;
}

async function getProductByName(name) {
  const result = await productModel.getProductByName(name);
  if (result.length === 0) {
    const resultAll = await productModel.getAll();

    return { type: 404, message: resultAll }
  } 
  
  return { type: null, message: result }
}

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};