const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/connectDB');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const snippetRoutes = require('./routes/snippetRoutes');
const commentRoutes = require('./routes/commentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/notifications', notificationRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
