const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

// CRUD routes
router.post('/products', productController.createProduct);  // Create a new product
router.get('/products', productController.getProducts);    // Get all products
router.post('/login', productController.loginAdmin);       // Admin login

// New routes for delete and update
router.delete('/products/:id', productController.deleteProduct); // Delete a product by ID
router.put('/products/:id', productController.editProduct);      // Update a product by ID
router.get('/products/:id', productController.getProductById); // Get a product by ID

module.exports = router;
