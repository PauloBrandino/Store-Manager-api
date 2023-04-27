const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');


router.get('/', productController.getAll);

module.exports = router;