const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { allProducts, newProduct } = require('./mock/productsMock');
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
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

      const result = await productModel.getById(1);
      
      expect(result).to.be.deep.equal(allProducts[0]);
      expect(result).to.contain.keys(['id', 'name']);
    });
    it('Create product', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await productModel.createProduct(newProduct);

      expect(result).to.be.an('object');
      expect(result.id).to.be.an('number');
      expect(result.id).to.be.equal(3);
    });
  });
});