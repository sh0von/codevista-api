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
exports.getNotificationsForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
