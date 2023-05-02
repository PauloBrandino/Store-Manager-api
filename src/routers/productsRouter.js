const express = require('express');

const router = express.Router();

const { productController } = require('../controllers');
const { productValidation } = require('../middlewares/productValidator');

router.get('/', productController.getAll);

router.get('/:id', productController.getById);
router.post('/', productValidation, productController.createProduct);
router.put('/:id', productValidation, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;