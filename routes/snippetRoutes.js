const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const snippetController = require('../controllers/snippetController');

// Get all snippets
router.get('/', snippetController.getAllSnippets);

// Get a specific snippet by ID
router.get('/:snippetId', snippetController.getSnippetById);

// Create a new snippet
router.post('/', authenticateToken, snippetController.createSnippet);

// Update a snippet by ID
router.put('/:snippetId', authenticateToken, snippetController.updateSnippet);

// Delete a snippet by ID
router.delete('/:snippetId', authenticateToken, snippetController.deleteSnippet);

// Approve or disapprove a snippet by ID
router.put('/approve/:snippetId', authenticateToken, snippetController.toggleApprovalSnippet);

// Love a snippet by ID
router.put('/love/:snippetId', authenticateToken, snippetController.loveSnippet);


module.exports = router;
