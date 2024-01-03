const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const productsModel = require('../models/productsModel');

class CheckOutController {
    async getUserInformation(req, res, next) {
        try {
            const userId = req.params.userId; 
        
            const user = await userModel.findById(userId);
        
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
        
            res.status(200).json({
                message: 'User information retrieved successfully',
                user: user 
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
    
    async placeAnOrder(req, res, next) {
        try {
            const { user, products, delivered, paid, orderDate, totalPrice, consignee, consigneePhone, shippingAddress, paymentMethod, productsWithFullInfo } = req.body;

            const newOrderItem = new orderModel({
                user: user,
                products: products,
                delivered: delivered,
                paid: paid,
                orderDate: orderDate,
                totalPrice: totalPrice,
                consignee: consignee,
                consigneePhone: consigneePhone,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod
            })

            // duyệt qua các sản phẩm nằm trong đơn hàng
            for (let i = 0; i< productsWithFullInfo.length; i++){
                // load db tìm sản phẩm tương ứng
                const product = await productsModel.findById(productsWithFullInfo[i].product._id);
                // kiểm tra coi có tìm đc sản phẩm tương ứng không
                if (product) {
                    // duyệt qua các size mà sản phẩm này có
                    for (let j = 0; j < product.sizes.length ; j++){
                        // tìm size tương ứng size trong đơn hàng đặt
                        if (product.sizes[j].size === productsWithFullInfo[i].size){
                            // kiểm tra số lượng kho có lớn hơn hoặc bằng số lượng đặt hàng
                            if (product.sizes[j].quantity >= productsWithFullInfo[i].quantity){
                                // giảm số lượng tồn kho
                                product.sizes[j].quantity -= productsWithFullInfo[i].quantity;
                                await product.save();
                            }
                        }
                    }
                }
            }

            await newOrderItem.save();

            res.status(201).json({
                message: "Place an order successfully"
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

module.exports = new CheckOutController;