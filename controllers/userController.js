const User = require('../models/User');

// Retrieve user profile information
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user profile information
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.body;

    // Update user profile
    await User.findByIdAndUpdate(req.user._id, { username });

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
  try {
    // Delete user account
    await User.findByIdAndDelete(req.user._id);

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
