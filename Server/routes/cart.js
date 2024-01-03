const express = require('express');
const router = express.Router();

const CartController = require('../controllers/CartController');

router.post('/addToCart', CartController.addToCart);
router.get('/carts/:userId', CartController.getCartByUserId);
router.delete('/deleteCart', CartController.deleteCart);
router.post('/updateQuantity/:cartId', CartController.updateQuantity)

module.exports = router;