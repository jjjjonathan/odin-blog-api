const express = require('express');
const passport = require('passport');

const Comment = require('../models/comment');

const router = express.Router();

// Delete comment
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    // must be either admin user, or user's own comment
    if (
      !req.user.admin &&
      comment.user.toString() !== req.user._id.toString()
    ) {
      return res.sendStatus(403);
    }
    await Comment.findByIdAndDelete(req.params.id);
    return res.sendStatus(204);
  },
);

module.exports = router;
