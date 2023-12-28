const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');

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
}

module.exports = new CheckOutController;