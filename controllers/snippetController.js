const Snippet = require('../models/Snippet');

// Get all snippets filtered by language, user, or search query
exports.getAllSnippets = async (req, res) => {
  try {
    let query = {};

    // Check if language query parameter is provided
    if (req.query.language) {
      query.language = req.query.language;
    }

    // Check if user query parameter is provided
    if (req.query.user) {
      query.user_id = req.query.user;
    }

    // Check if search query parameter is provided
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { code: searchRegex }
      ];
    }

    const snippets = await Snippet.find(query);
    res.json(snippets);
  } catch (error) {
    console.error('Error getting snippets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Get a specific snippet by ID
exports.getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.snippetId);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    console.error('Error getting snippet by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new snippet
exports.createSnippet = async (req, res) => {
  try {
    const { title, description, code, language, visibility } = req.body;
    const newSnippet = new Snippet({
      title,
      description,
      code,
      language,
      visibility,
      user_id: req.user._id
    });
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    console.error('Error creating snippet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a snippet by ID
exports.updateSnippet = async (req, res) => {
  try {
    const { title, description, code, language, visibility } = req.body;
    const updatedSnippet = await Snippet.findByIdAndUpdate(req.params.snippetId, { title, description, code, language, visibility }, { new: true });
    if (!updatedSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(updatedSnippet);
  } catch (error) {
    console.error('Error updating snippet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a snippet by ID
exports.deleteSnippet = async (req, res) => {
  try {
    const deletedSnippet = await Snippet.findByIdAndDelete(req.params.snippetId);
    if (!deletedSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Error deleting snippet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Approve or disapprove a snippet by ID
exports.toggleApprovalSnippet = async (req, res) => {
    try {
      const snippet = await Snippet.findById(req.params.snippetId);
      if (!snippet) {
        return res.status(404).json({ message: 'Snippet not found' });
      }
      
      // Toggle is_approved field
      snippet.is_approved = !snippet.is_approved;
      await snippet.save();
      
      // Determine the appropriate message based on the new value of is_approved
      const message = snippet.is_approved ? 'Snippet approved successfully' : 'Snippet disapproved successfully';
      
      res.json({ message });
    } catch (error) {
      console.error('Error toggling approval for snippet:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Love a snippet by ID
exports.loveSnippet = async (req, res) => {
    try {
      const snippet = await Snippet.findById(req.params.snippetId);
      if (!snippet) {
        return res.status(404).json({ message: 'Snippet not found' });
      }
      
      // Check if the user has already loved the snippet
      if (snippet.lovedBy.includes(req.user._id)) {
        return res.status(400).json({ message: 'You have already loved this snippet' });
      }
      
      // Increment the loves count and add the user ID to the lovedBy array
      snippet.loves++;
      snippet.lovedBy.push(req.user._id);
      await snippet.save();
      await notificationController.createNotification(love.userId, love.snippetId, 'love');
            
      res.json({ message: 'Snippet loved successfully' });
    } catch (error) {
      console.error('Error loving snippet:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  