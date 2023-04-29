const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { newSale, newSaleInvalid } = require('../models/mock/salesMock');
const { saleService } = require('../../../src/services');

describe('Sales Service Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('Register a successful sale', async () => {
      sinon.stub(salesModel, 'createNewSale').resolves(newSale);

      const result = await saleService.createNewSale(newSale);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSale);
    });
  });
  describe('Fails Case', () => {
    afterEach(() => sinon.restore());

    it('Returns "Product not found" message if the product id is not found', async () => {
      sinon.stub(salesModel, 'createNewSale').resolves(undefined);

      const result = await saleService.createNewSale(newSaleInvalid);

      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.equal('Product not found');
    });
  });
});