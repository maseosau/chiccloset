const cartModel = require('../models/cartModel');

class CartController {
    async addToCart(req, res, next) {
        try {
            const { userId, productId, quantity, totalPrice, size } = req.body;

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
                totalPrice: totalPrice,
                size: size
            });

            console.log(newCartItem);

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

            // const carts = await cartModel.find({ user: userId });
            const carts = await cartModel.find({ user: userId }).populate('product');
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

    async deleteCart(req, res, next) {
        try {
            const { userId, productId } = req.query;

            // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng của người dùng không
            const cartItem = await cartModel.findOne({ product: productId, user: userId });

            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            // Xóa sản phẩm khỏi giỏ hàng của người dùng
            const deleted = await cartModel.deleteOne({ product: productId, user: userId });

            res.status(200).json({ message: 'Cart item deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateQuantity(req, res, next) {
        try {
            const cartId = req.params.cartId;
            const { quantity } = req.body;

            const updateCart = await cartModel.findById(cartId);

            if (updateCart) {
                updateCart.quantity = quantity;
            }

            await updateCart.save();

            res.status(201).json({
                message: "Update quantity successfully"
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