const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userController = require('../controllers/userController');

// Retrieve user profile information
router.get('/', authenticateToken, userController.getUserProfile);

// Update user profile information
router.put('/', authenticateToken, userController.updateUserProfile);

// Delete user account
router.delete('/', authenticateToken, userController.deleteUserAccount);

module.exports = router;
