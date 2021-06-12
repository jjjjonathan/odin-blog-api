const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
});

PostSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

module.exports = mongoose.model('Post', PostSchema);
