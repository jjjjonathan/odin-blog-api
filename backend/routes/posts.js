const express = require('express');
const passport = require('passport');

const Post = require('../models/post');

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  const posts = await Post.find({}).populate({
    path: 'user',
    select: 'username email admin',
  });
  console.log(posts);
  res.json(posts);
});

// Add new blog post
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { title, body, published } = req.body;
    const user = req.user._id;
    const timestamp = new Date();

    const post = new Post({
      title,
      body,
      published,
      user,
      timestamp,
    });

    await post.save();
    res.json(post);
  },
);

module.exports = router;
