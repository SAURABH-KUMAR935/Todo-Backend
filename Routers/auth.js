const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/check-session', authController.checkSession);
router.post('/logout', authController.logout);

module.exports = router;