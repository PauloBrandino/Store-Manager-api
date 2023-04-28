const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { newSale } = require('../models/mock/salesMock');
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
});