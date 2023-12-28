const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

class UserControllers {
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            const isValidPassword = await bcryptjs.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({
                    message: 'Invalid password',
                });
            } else {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.status(200).json({
                    token
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    async signUp(req, res, next) {
        try {
            const { username, email, fullname, password } = req.body;

            const isExistedEmail = await userModel.findOne({ email });
            const isExistedUsername = await userModel.findOne({ username });

            if (isExistedEmail) {
                return res.status(401).json({
                    message: "This email already exists"
                })
            }
            if (isExistedUsername) {
                return res.status(401).json({
                    message: "This username already exists"
                })
            }

            const hashPassword = await bcryptjs.hash(password, 8);
            const newUser = new userModel({ email: email, username: username, fullname: fullname, password: hashPassword, phoneNumber: '', address: '',  });

            await newUser.save();

            res.status(201).json({
                message: "User created successfully"
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    async updateInfomation(req, res, next) {
        try {
            const userId = req.params.userId;
            const { phoneNumber, address, fullname, email, oldPassword, newPassword } = req.body;

            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            // Cập nhật thông tin của user nếu được cung cấp
            if (phoneNumber) {
                user.phoneNumber = phoneNumber;
            }
            if (address) {
                user.address = address;
            }
            if (fullname) {
                user.fullname = fullname;
            }
            if (email) {
                user.email = email;
            }
            if (oldPassword && newPassword) {
                const isValidPassword = await bcryptjs.compare(oldPassword, user.password);
                if (isValidPassword) {
                    const hashPassword = await bcryptjs.hash(newPassword, 8);
                    user.password = hashPassword;
                }
                else {
                    return res.status(401).json({
                        message: "Old password is not correct"
                    })
                }
            }

            // Lưu thông tin đã cập nhật vào cơ sở dữ liệu
            await user.save();
            
            res.status(200).json({
                message: 'User information updated successfully',
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
    
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

    async getOrderInformation(req, res, next) {
        try {
            const userId = req.params.userId; 
        
            const orders = await orderModel.find({user: userId});
        
            if (!orders) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
        
            res.status(200).json({
                message: 'User information retrieved successfully',
                orders: orders 
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new UserControllers;