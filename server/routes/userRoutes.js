// PACKAGES
const express = require('express');

// FILES
const { registerUser, verifyEmail, logout, loginUser, resendVerificationEmail, verifyUser, updateUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

// ROUTER OBJECT
const router = express.Router();

// CREATED ROUTES
router.post('/register', registerUser);
router.post('/verify-email', authenticate, verifyEmail);
router.post('/resend-otp', authenticate, resendVerificationEmail);
router.post('/login', loginUser);
router.get('/verify-user', authenticate, verifyUser);
router.put('/update', authenticate, updateUser);
router.delete('/logout', logout);

// EXPORT ROUTER
module.exports = router;
