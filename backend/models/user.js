const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

UserSchema.plugin(uniqueValidator);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.passwordHash;
  },
});

module.exports = mongoose.model('User', UserSchema);
