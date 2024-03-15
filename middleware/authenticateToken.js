const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    // Extract JWT token from Authorization header
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists in database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user object to request
    req.user = user;

    // Call next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
