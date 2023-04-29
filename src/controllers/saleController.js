const { saleService } = require('../services');

async function createNewSale(req, res) {
  const newSale = req.body;

  const { type, message } = await saleService.createNewSale(newSale);
  if (type) return res.status(404).json({ message });

  return res.status(201).json(message);
}

module.exports = {
   createNewSale,
};