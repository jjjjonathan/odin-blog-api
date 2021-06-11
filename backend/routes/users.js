const express = require('express');
const bcrypt = require('bcryptjs');
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

router.post('/login', (req, res) => {
  res.send('this is the login route');
});

module.exports = router;
