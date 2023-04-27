const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { connection } = require('../../../src/models');
const { allProducts } = require('./mock/productsMock');

describe('Products Model Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());
    it('List all registered products', async () => {
      sinon.stub(connection, 'execute').resolves([allProducts]);

      const result = await productModel.getAll();
      expect(result).to.be.an('array');
      expect(result[0]).to.contain.keys(['id', 'name']);
    });
  });
});