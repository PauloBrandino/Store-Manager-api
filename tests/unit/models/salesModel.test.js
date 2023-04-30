const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { newSale, listSalesMock } = require('./mock/salesMock');
const { salesModel } = require('../../../src/models');

describe('Sales Model Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('Register a successful sale', async () => {
      sinon.stub(connection, 'execute').resolves(newSale);

      const result = await salesModel.createNewSale(newSale);

      expect(result).to.be.an('object');
      expect(result).to.have.keys('id', 'itemsSold');
    });
    it('Returns a list of registered sales', async () => {
      sinon.stub(connection, 'execute').resolves(listSalesMock);

      const result = await salesModel.getAllSales();

      expect(result).to.be.an('object');
      expect(result).to.have.keys('saleId', 'date', 'productId', 'quantity')
    });
    it('', async () => {
      sinon.stub(connection, 'execute').resolves(listSalesMock);

      const result = await salesModel.getSaleById(1);

      expect(result).to.deep.equal(listSalesMock);
    });
  });
});