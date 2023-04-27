const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { allProducts, productById } = require('./mock/productsMock');
const connection = require('../../../src/models/connection');

describe('Products Model Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());
    it('List all registered products', async () => {
      sinon.stub(connection, 'execute').resolves([allProducts]);

      const result = await productModel.getAll();
      expect(result).to.be.an('array');
      expect(result[0]).to.contain.keys(['id', 'name']);
    });
    it('List registered product by id', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);

      const [result] = await productModel.getById();
      expect(result).to.contain.keys(['id', 'name']);
      expect(result.id).to.be.equal(1);
    });
  });
});