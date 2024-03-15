const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const favoriteController = require('../controllers/favoriteController');

// Add a snippet to favorites
router.post('/:snippetId', authenticateToken, favoriteController.addToFavorites);

// Remove a snippet from favorites
router.delete('/:snippetId', authenticateToken, favoriteController.removeFromFavorites);

module.exports = router;
