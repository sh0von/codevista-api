const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const notificationController = require('../controllers/notificationController');

// Get notifications for the authenticated user
router.get('/', authenticateToken, notificationController.getNotificationsForUser);

module.exports = router;
