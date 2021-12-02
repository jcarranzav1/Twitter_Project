const express = require('express');
const tweets = require('./tweets/routes');
const users = require('./users/routes');

const router = express.Router();
router.use('/tweets', tweets);
router.use('/users', users);

module.exports = router;
