const connection = require('./connection');

async function getAll() {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );
  return result;
}

async function getById(id) {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?;',
    [id],
  );
  return result[0];
}

async function createProduct({name}) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );

  const newProductWithId = { name, id: insertId };

  return newProductWithId;
}

module.exports = {
  getAll,
  getById,
  createProduct,
};