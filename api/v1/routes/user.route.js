const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// validate data
const validate = require('../validate/user.validate');

router.post('/register', validate.register, controller.register)
router.post('/login', controller.login)
router.post('/password/forgot', controller.forgotPassword)
router.post('/password/otp', controller.otpPassword)
router.post('/password/reset', controller.resetPassword)


module.exports = router;
