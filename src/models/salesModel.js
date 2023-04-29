const connection = require('./connection');

async function createSaleId() {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return insertId;
}

async function createNewSale(newSales) {
  const saleId = await createSaleId();
  
  Promise.all(newSales.map(({ productId, quantity }) => (
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    ))));
    
  return { id: saleId, itemsSold: newSales };
}

module.exports = {
  createNewSale,
};