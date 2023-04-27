const { productModel } = require("../models");

async function getAll() {
  const products = await productModel.getAll();

  return { type: null, message: products };
};

module.exports = {
  getAll,
};