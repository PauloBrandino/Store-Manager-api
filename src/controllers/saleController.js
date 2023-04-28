const { saleService } = require("../services");

async function createNewSale(req, res) {
  const newSale = req.body;

  const { message } = await saleService.createNewSale(newSale);

  return res.status(201).json(message);
}

module.exports = {
   createNewSale,
}