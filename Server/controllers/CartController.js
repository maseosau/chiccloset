const cartModel = require('../models/cartModel');

class CartController {
    async addToCart(req, res, next) {
        try {
            const { userId, productId, quantity, totalPrice } = req.body;

            const existsProduct = await cartModel.find({ product: productId, user: userId });

            if (existsProduct.length > 0) {
                return res.status(401).json({
                    message: "Product already exists in cart",
                });
            }

            const newCartItem = new cartModel({
                user: userId,
                product: productId,
                quantity: quantity,
                totalPrice: totalPrice
            });

            await newCartItem.save();

            res.status(201).json({
                message: "Add to cart successfully"
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    async getCartByUserId(req, res, next) {
        try {
            const userId = req.params.userId;

            const carts = await cartModel.find({user: userId});
            // if (carts.length === 0) {
            //     return res.status(404).json({
            //         message: 'Carts not found',
            //     });
            // }

            res.status(200).json({
                message: 'Carts retrieved successfully',
                carts: carts,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new CartController;