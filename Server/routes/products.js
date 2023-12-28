const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/products/:category', ProductController.getProductsByCategory);
router.get('/product/:productId', ProductController.getProductById);
router.get('/products', ProductController.getAllProducts);
router.get('/search/:keyword', ProductController.search);

module.exports = router;