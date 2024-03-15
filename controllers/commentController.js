const Comment = require('../models/Comment');
const Snippet = require('../models/Snippet');
const NotificationController = require('../controllers/notificationController');

// Add a comment to a snippet
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const snippetId = req.params.snippetId;

    // Check if the snippet exists
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Create the comment
    const comment = new Comment({
      content,
      user_id: req.user._id, // Set the user_id to the authenticated user's ID
      snippet_id: snippetId // Set the snippet_id to the ID of the snippet
    });
    await comment.save();
    await NotificationController.createNotification(comment.user_id, snippetId, 'comment');
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Check if the user is authorized to delete the comment
      if (comment.user_id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this comment' });
      }
  
      // Delete the comment
      await Comment.deleteOne({ _id: req.params.commentId });
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  // Get all comments for a snippet by snippet ID
exports.getAllComments = async (req, res) => {
    try {
      const snippetId = req.params.snippetId;
      const comments = await Comment.find({ snippet_id: snippetId });
      res.json(comments);
    } catch (error) {
      console.error('Error getting comments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };