const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile/:id', userController.getUserProfile);

// Update user profile
router.put('/profile/:id', userController.updateUserProfile);

// Delete user account
router.delete('/profile/:id', userController.deleteUserAccount);

module.exports = router;