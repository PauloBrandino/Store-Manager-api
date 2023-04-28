const { salesModel } = require("../models")

async function createNewSale(newSale) {
  const createdSale = await salesModel.createNewSale(newSale);

  return { type: null, message: createdSale };
};

module.exports = {
  createNewSale,
}