const Snippet = require('../models/Snippet');

// Add a snippet to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const snippetId = req.params.snippetId;
    const userId = req.user._id;

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if the snippet is already in favorites
    if (snippet.favorites.includes(userId)) {
      return res.status(400).json({ message: 'Snippet is already in favorites' });
    }

    snippet.favorites.push(userId);
    await snippet.save();

    res.json({ message: 'Snippet added to favorites' });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove a snippet from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const snippetId = req.params.snippetId;
    const userId = req.user._id;

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if the snippet is in favorites
    if (!snippet.favorites.includes(userId)) {
      return res.status(400).json({ message: 'Snippet is not in favorites' });
    }

    snippet.favorites = snippet.favorites.filter(fav => fav != userId);
    await snippet.save();

    res.json({ message: 'Snippet removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
