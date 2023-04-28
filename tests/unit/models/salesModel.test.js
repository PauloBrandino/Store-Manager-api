const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { newSale } = require('./mock/salesMock');
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
  });
});