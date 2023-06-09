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
    it('Returns the sales registered with the reference id', async () => {
      sinon.stub(connection, 'execute').resolves(listSalesMock);

      const { saleId } = await salesModel.getSaleById(1);

      expect(saleId).to.be.equal(1);
    });
    it('Delete sale sucess', async () => {
      sinon.stub(connection, 'execute').resolves(true);

      const result = await salesModel.deleteSale(1);

      expect(result).to.be.equal(true);
    });
    it('Update sale sucess', async () => {
      const updateMock = {
        "productId": 1,
        "quantity": 10
      };
      
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.updateSale(1, updateMock);

      expect(result).to.be.equal(true);
    });
  });
});