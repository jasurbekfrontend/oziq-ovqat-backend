const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.post('/login', productController.loginAdmin);
router.get('/getRole', productController.checkToken);

router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.editProduct);
router.get('/products/:id', productController.getProductById);


router.post('/sell', productController.sellProduct);

module.exports = router;
