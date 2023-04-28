const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { newSale } = require('../models/mock/salesMock');
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers/saleController');

const { expect } = chai;
chai.use(sinonChai);


describe('Sales Controller Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('Register a successful sale', async () => {
      sinon.stub(saleService, 'createNewSale').resolves({
        id: 16,
        itemsSold: [
          {
            "productId": 1,
            "quantity": 1
          },
        ]
      });

      const req = newSale;
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });
    describe('Fails Case', () => {
    });
  });
});