const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_approved: {
    type: Boolean,
    default: false
  },
  loves: {
    type: Number,
    default: 0
  },
  lovedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who loved the snippet
  created_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
