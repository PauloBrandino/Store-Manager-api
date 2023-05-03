const { saleService } = require('../services');

async function createNewSale(req, res) {
  const newSale = req.body;

  const { type, message } = await saleService.createNewSale(newSale);
  if (type) return res.status(404).json({ message });

  return res.status(201).json(message);
}

async function getAllSales(_req, res) {
  const { message } = await saleService.getAllSales();

  return res.status(200).json(message);
}

async function getSaleById(req, res) {
  const { id } = req.params;
  const { type, message } = await saleService.getSaleById(Number(id));
  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSale(id);
  if (type) return res.status(404).json({ message });

  return res.status(204).json();
}

async function updateSale(req, res) {
  const { id } = req.params;
  const infoToUpdate = req.body;
  
  const { type, message } = await saleService.updateSale(id, infoToUpdate);
  if (type) return res.status(404).json({ message });

  return res.status(200).json(message); 
}
module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};