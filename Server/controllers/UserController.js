const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const sendOTPEmail = async (email, OTP) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'schiccloset@gmail.com',
            pass: 'kchrsiecgeqdicoa'
        }
    });

    const mailOptions = {
        from: 'schiccloset@gmail.com',
        to: email,
        subject: 'Xác thực email',
        html: `<p>Mã xác thực của bạn là: <strong>${OTP}</strong></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP is sent successfully");
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
}

const resetPassword = async (email, password) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'schiccloset@gmail.com',
            pass: 'kchrsiecgeqdicoa'
        }
    });

    const mailOptions = {
        from: 'schiccloset@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `<p>Mật khẩu mới của bạn là: <strong>${password}</strong></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Password is sent successfully");
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
}

const generateRandomPassword = () => {
    const length = 8;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=~`[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(characters.length);
      password += characters[randomIndex];
    }
  
    return password;
  }

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
            }

            if (!user.verified && user.OTP.expireAt < new Date()) {
                await userModel.findOneAndDelete({ username: username });

                return res.status(404).json({
                    message: 'User not found',
                });
            }

            if (user.verified === false) {
                return res.status(403).json({
                    message: 'Unauthenticated user',
                });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.status(200).json({
                token
            });
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
            const OTP = Math.floor(100000 + Math.random() * 900000).toString();
            const expireAt = new Date(Date.now() + 10 * 60 * 1000);

            const newUser = new userModel({
                email: email,
                username: username,
                fullname: fullname,
                password: hashPassword,
                phoneNumber: '',
                address: '',
                image: '',
                OTP: {
                    otp: OTP,
                    expireAt: expireAt,
                },
                verified: false,
            });

            await newUser.save();

            sendOTPEmail(email, OTP);

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

    async getOTP(req, res, next) {
        try {
            const { email } = req.body;

            const user = await userModel.findOne({ email: email });

            const OTP = Math.floor(100000 + Math.random() * 900000).toString();
            const expireAt = new Date(Date.now() + 10 * 60 * 1000);

            user.OTP.otp = OTP;
            user.OTP.expireAt = expireAt;

            await user.save();

            sendOTPEmail(email, OTP);

            res.status(200).json({
                message: "Get OTP successfully"
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    async verifyOTP(req, res, next) {
        try {
            const { email, userOTP } = req.body;

            const user = await userModel.findOne({ email: email });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            if (user.OTP.otp !== userOTP) {
                return res.status(401).json({
                    message: "OTP does not match"
                })
            }

            if (user.OTP.expireAt < new Date()) {
                // Xử lý khi OTP đã hết hạn
                return res.status(401).json({
                    message: "OTP has expired. Please send email again."
                });
            }

            user.verified = true;
            await user.save();

            res.status(200).json({
                message: 'Verify email successfully',
                user: user
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    async sendPassword(req, res, next) {
        try {
            const { email } = req.body;

            const user = await userModel.findOne({ email: email });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            const password = await generateRandomPassword();
            const hashPassword = await bcryptjs.hash(password, 8);
            user.password = hashPassword;

            await user.save();

            resetPassword(email, password);

            res.status(200).json({
                message: 'Reset password successfully. Please check email to get new password!',
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }


    async updateInfomation(req, res, next) {
        try {
            const userId = req.params.userId;
            const { image, phoneNumber, address, fullname, email, oldPassword, newPassword } = req.body;

            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            // Cập nhật thông tin của user nếu được cung cấp
            if (image || image === '') {
                user.image = image;
            }

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

            const orders = await orderModel.find({ user: userId }).populate('user').populate('products.product');

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

    async payOrder(req, res, next) {
        try {
            //   const orderId = req.params.orderId; // Lấy orderId từ URL
            const { paymentMethod, orderId } = req.body; // Lấy paymentMethod từ body của yêu cầu

            if (!orderId || paymentMethod === undefined) {
                return res.status(400).json({ message: 'Invalid input' });
            }

            const order = await orderModel.findById(orderId);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            order.paymentMethod = paymentMethod;
            order.paid = 1;

            await order.save();

            res.status(200).json({ message: 'Pay successfully', order });
        } catch (error) {
            console.error(error);
            // Xử lý lỗi và trả về thông báo lỗi nếu có
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}

module.exports = new UserControllers;