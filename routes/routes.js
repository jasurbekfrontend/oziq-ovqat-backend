const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

// Example CRUD routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.post('/login', productController.loginAdmin);

module.exports = router;
