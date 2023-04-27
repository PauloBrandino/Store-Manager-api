const { productService } = require("../services");

async function getAll(_req, res) {
  const { message } = await productService.getAll();

  return res.status(200).json(message);
};

module.exports = {
  getAll,
};