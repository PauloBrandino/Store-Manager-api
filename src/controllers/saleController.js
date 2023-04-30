const { saleService } = require('../services');

async function createNewSale(req, res) {
  const newSale = req.body;

  const { type, message } = await saleService.createNewSale(newSale);
  if (type) return res.status(404).json({ message });

  return res.status(201).json(message);
};

async function getAllSales(_req, res) {
  const { message } = await saleService.getAllSales();

  return res.status(200).json(message);
}

module.exports = {
  createNewSale,
  getAllSales,
};