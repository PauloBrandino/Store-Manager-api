const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { newSale, newSaleInvalid, listSalesMock } = require('../models/mock/salesMock');
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
    it('Returns a list of registered sales', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(listSalesMock);

      const { type, message } = await saleService.getAllSales();

      expect(type).to.equal(null);
      expect(message).to.be.an('array');
      expect(message).to.deep.equal(listSalesMock);
    });
    it('Returns the sales registered with the reference id', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(listSalesMock);

      const { type, message } = await saleService.getSaleById(1);

      expect(message).to.deep.equal(listSalesMock);
      expect(type).to.equal(null);
    });
  });
  describe('Fails Case', () => {
    afterEach(() => sinon.restore());

    it('Returns "Product not found" message if the product id is not found', async () => {
      sinon.stub(salesModel, 'createNewSale').resolves(undefined);

      const { type, message } = await saleService.createNewSale(newSaleInvalid);

      expect(type).to.be.equal(404);
      expect(message).to.be.equal('Product not found');
    });
  });
});