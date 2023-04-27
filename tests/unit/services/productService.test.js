const { expect } = require('chai');
const sinon = require('sinon');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { allProducts, productById } = require('../models/mock/productsMock');


describe('Product Service Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('List all registered products', async () => {
      sinon.stub(productModel, 'getAll').resolves(allProducts);

      const { message } = await productService.getAll();
      expect(message).to.be.an('array');
      expect(message).to.deep.equal(allProducts);
    });
    it('List registered products by id', async () => {
      const id = 1;
      sinon.stub(productModel, 'getById').resolves(productById);

      const { type, message } = await productService.getById(id);

      expect(message).to.deep.equal(productById);
      expect(type).to.be.null;
    })
  });
});