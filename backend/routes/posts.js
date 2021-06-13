const express = require('express');
const passport = require('passport');

const Post = require('../models/post');
const Comment = require('../models/comment');

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  const posts = await Post.find({ published: true })
    .populate({
      path: 'user',
      select: 'username email admin',
    })
    .populate({
      path: 'comments',
      select: 'body timestamp user -post',
      populate: { path: 'user', select: 'username email' },
    });
  res.json(posts);
});

// Add new blog post
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user.admin) return res.sendStatus(403);

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

// Get single blog post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'user',
    select: 'username email admin',
  });
  res.json(post);
});

// Delete blog post
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user.admin) return res.sendStatus(403);
    await Post.findByIdAndDelete(req.params.id);
    return res.sendStatus(204);
  },
);

// Add comment to blog post
router.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { body } = req.body;
    const timestamp = new Date();
    const user = req.user._id;
    const post = req.params.id;

    const comment = new Comment({ body, post, timestamp, user });
    await comment.save();

    const populatedComment = await comment
      .populate('user', '-posts -comments')
      .execPopulate();

    res.json(populatedComment);
  },
);

// Get all comments from blog post
router.get('/:id/comments', async (req, res) => {
  const comments = await Comment.find(
    { post: req.params.id },
    '-post',
  ).populate({
    path: 'user',
    select: 'username email admin',
  });
  res.json(comments);
});

module.exports = router;
