const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { allProducts, productById } = require('../models/mock/productsMock');


describe('Product Controller Tests', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('List all registered products', async () => {
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getAll').resolves({ type: null, message: allProducts });

      await productController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
    it('List registered products by id', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getById').resolves({ type: null, message: productById });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productById);
    });
  });
});