const connection = require('./connection');

async function createSaleId() {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return insertId;
};

async function createNewSale(newSales) {
  const saleId = await createSaleId();
  
  Promise.all(newSales.map(({ productId, quantity }) => (
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    ))));
    
  return { id: saleId, itemsSold: newSales };
};

async function getAllSales() {
  const result = await connection.execute(
    'SELECT sp.sale_id, sp.product_id, sp.quantity, s.`date` FROM StoreManager.sales_products AS sp	INNER JOIN StoreManager.sales as s ON sp.sale_id = s.id;'
  )

  return result
}

module.exports = {
  createNewSale,
  getAllSales,
};