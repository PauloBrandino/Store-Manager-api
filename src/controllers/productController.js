const { productService } = require("../services");

async function getAll(_req, res) {
  const { message } = await productService.getAll();

  return res.status(200).json(message);
};

async function getById(req, res) {
  const { id } = req.params;

  const { message } = await productService.getById(id);
  return res.status(200).json(message);
}

module.exports = {
  getAll,
  getById,
};