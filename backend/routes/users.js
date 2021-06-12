const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
// const { body, validationResult } = require('express-validator');

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
      });
    }
  } catch (error) {
    // User not found
    res.status(401).json({ message: 'Authorization failed', error });
  }
});

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user);
    return res.status(200).send('YAY! this is a protected Route');
  },
);

module.exports = router;
