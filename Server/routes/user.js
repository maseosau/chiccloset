const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.signUp)
router.post('/login', UserController.login)
router.put('/update/:userId', UserController.updateInfomation)
router.get('/getInformation/:userId', UserController.getUserInformation)
router.get('/getOrderInformation/:userId', UserController.getOrderInformation)
router.post('/verifyOTP', UserController.verifyOTP)
router.post('/getOTP', UserController.getOTP)
router.post('/sendPassword', UserController.sendPassword)
router.post('/payOrder/:orderId', UserController.payOrder)

module.exports = router;