const connection = require("./connection")

async function createNewSale(newSales) {
  const saleId = await createSaleId();
  
  const createdSale = Promise.all(newSales.map(async ({ productId, quantity }) => (
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    ))
  ));
    
  return { id: saleId, itemsSold: newSales };
}

async function createSaleId() {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());'
  );

  return insertId
};

module.exports = {
  createNewSale,
}