const connection = require('./connection');

async function getAll() {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;'
  );

  return result;
};

module.exports = {
  getAll,
};