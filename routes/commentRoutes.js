const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const commentController = require('../controllers/commentController');

// Add a comment to a snippet
router.post('/:snippetId', authenticateToken, commentController.addComment);

// Delete a comment by ID
router.delete('/:commentId', authenticateToken, commentController.deleteComment);

// Get all comments for a snippet by snippet ID
router.get('/:snippetId', commentController.getAllComments);

module.exports = router;
