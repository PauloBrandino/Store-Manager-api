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
    it('Update sale sucess', async () => {
      const updateMock = [{
        "productId": 1,
        "quantity": 10
      }];
      sinon.stub(salesModel, 'updateSale').resolves(true);

      const { type, message: { itemsUpdated } } = await saleService.updateSale(1, updateMock);

      expect(itemsUpdated).to.deep.equal(updateMock);
      expect(type).to.equal(null);
    });
    it('Delete sale sucess', async () => {
      sinon.stub(salesModel, 'deleteSale').resolves(true);

      const result = await saleService.deleteSale(1);

      expect(result).to.deep.equal(true);
    });
  });
  describe('Fails Case', () => {
    afterEach(() => sinon.restore());

    it('Returns "Product not found" message if the product id is not found', async () => {
      sinon.stub(salesModel, 'createNewSale').resolves([]);

      const { type, message } = await saleService.createNewSale(newSaleInvalid);

      expect(type).to.be.equal(404);
      expect(message).to.be.equal('Product not found');
    });
    it('Returns "Sale not found" message if the product id is not found when select sale by id', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves([]);

      const { type, message } = await saleService.getSaleById(999);
 
      expect(message).to.be.equal('Sale not found');
      expect(type).to.be.equal(404);
    });
    it('Update sale fail with product id nonexistent', async () => {
      const updateMock = [{
        "productId": 10,
        "quantity": 10
      }];
      sinon.stub(salesModel, 'updateSale').resolves(true);

      const { type, message } = await saleService.updateSale(1, updateMock);

      expect(message).to.deep.equal('Product not found');
      expect(type).to.equal(404);
    });
    it('Update sale fail with product id nonexistent', async () => {
      const updateMock = [{
        "productId": 1,
        "quantity": 10
      }];
      sinon.stub(salesModel, 'updateSale').resolves(true);

      const { type, message } = await saleService.updateSale(100, updateMock);

      expect(message).to.deep.equal('Sale not found');
      expect(type).to.equal(404);
    });
    it('Delete sale fail with sale id nonexistent', async () => {
      sinon.stub(salesModel, 'deleteSale').resolves({ message: 'Sale not found' });

      const { type, message } = await saleService.deleteSale(100);

      expect(message).to.deep.equal('Sale not found');
      expect(type).to.equal(404);
    });
  });
});