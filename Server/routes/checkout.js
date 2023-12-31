const express = require('express');
const router = express.Router();

const UserController = require('../controllers/CheckOutController');

// router.post('/register', UserController.signUp)
// router.post('/login', UserController.login)
// router.post('/update/:userId', UserController.updateInfomation)
router.get('/getInformation/:userId', UserController.getUserInformation)
router.post('/placeAnOrder', UserController.placeAnOrder)

module.exports = router;