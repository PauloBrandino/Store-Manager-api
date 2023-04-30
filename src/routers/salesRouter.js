const express = require('express');
const { saleController } = require('../controllers');
const { salesValidator } = require('../middlewares/salesValidator');

const router = express.Router();

router.post('/', salesValidator, saleController.createNewSale);
router.get('/', saleController.getAllSales);

module.exports = router;