const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password, admin } = req.body;

  const passwordHash = await bcrypt.hash(password, 11);

  const user = new User({
    username,
    email,
    passwordHash,
    admin,
  });

  await user.save();

  res.json({
    _id: user.id,
    username: user.username,
    email: user.email,
    admin: user.admin,
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const cryptResult = await bcrypt.compare(password, user.passwordHash);
    if (cryptResult) {
      const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 2592000, // Token valid for 30 days
      });
      return res.status(200).json({
        message: 'Successfully logged in',
        token,
        _id: user._id,
        username: user.username,
        email: user.email,
        admin: user.admin,
      });
    }
  } catch (error) {
    // User not found
    res.status(401).json({ message: 'Authorization failed', error });
  }
  res.status(401).json({ message: 'Authorization failed' });
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
      // Not logged in as requested user
      return res.sendStatus(403);
    }
    // All good, get user info
    const user = await User.findById(req.params.id, '-posts -comments');
    res.json(user);
  },
);

router.get(
  '/:id/posts',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
      // Not logged in as requested user
      return res.sendStatus(403);
    }
    // All good, get all posts by user
    const posts = await Post.find({ user: req.params.id }).populate({
      path: 'comments',
      select: 'body timestamp user -post',
      populate: { path: 'user', select: 'username email' },
    });
    res.json(posts);
  },
);

module.exports = router;
