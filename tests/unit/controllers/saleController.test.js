const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { newSale, newSaleInvalid, listSalesMock } = require('../models/mock/salesMock');
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);


describe('Sales Controller Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('Register a successful sale', async () => {
      sinon.stub(saleService, 'createNewSale').resolves({
        type: null,
        message: [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      });

      const req = {
        body: newSale,
      }
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.createNewSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]);
    });
    it('Register a successful sale', async () => {
      sinon.stub(saleService, 'getAllSales').resolves({
        type: null,
        message: listSalesMock
      });

      const req = {}
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listSalesMock);
    });
  });
  describe('Fails Case', () => {
    afterEach(() => sinon.restore());
    
    it('Returns a "product not found" message if the product id is not found', async () => {
      sinon.stub(saleService, 'createNewSale').resolves({
        type: 404,
        message: 'Product not found'
      });

      const req = {
        body: newSaleInvalid,
      }
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    })
  });
});