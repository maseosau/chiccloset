const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

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
            const { user, products, delivered, paid, orderDate, totalPrice, consignee, consigneePhone, shippingAddress, paymentMethod } = req.body;

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