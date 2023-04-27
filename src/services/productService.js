const { productModel } = require("../models");

async function getAll() {
  const products = await productModel.getAll();

  return { type: null, message: products };
};

async function getById(id) {
  const productById = await productModel.getById(id);

  return { type: null, message: productById };
}

module.exports = {
  getAll,
  getById,
};