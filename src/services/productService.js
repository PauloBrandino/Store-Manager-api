const { productModel } = require("../models");

async function getAll() {
  const products = await productModel.getAll();

  return products;
};

module.exports = {
  getAll,
};