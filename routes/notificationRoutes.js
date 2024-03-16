const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const notificationController = require('../controllers/notificationController');

// Get notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

module.exports = router;
