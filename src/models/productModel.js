const { connection } = require('./index');

async function getAll() {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;'
  );

  return result;
};

module.exports = {
  getAll,
};