function salesValidator(req, res, next) {
  const products = req.body;
  const validProductId = products.some((product) => product.productId === undefined);
  const validQuantity = products.some((product) => product.quantity === undefined);
  const validQuantityLength = products.some((product) => product.quantity <= 0);
  
  if (validProductId) return res.status(400).json({ message: '"productId" is required' });
  if (validQuantity) return res.status(400).json({ message: '"quantity" is required' });
  if (validQuantityLength) {
 return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
}

  next();
}

module.exports = {
  salesValidator,
};