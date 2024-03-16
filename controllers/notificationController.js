const Notification = require('../models/Notification');

// Create a new notification
exports.createNotification = async (userId, snippetId, type) => {
  try {
    const notification = new Notification({
      type,
      userId,
      snippetId
    });
    await notification.save();
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

// Get notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find notifications for the user
    const notifications = await Notification.find({ recipient: userId });
    res.json(notifications);
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};