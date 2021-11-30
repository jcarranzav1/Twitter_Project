const express = require('express');
const tweets = require('./tweets/tweets');

const router = express.Router();
router.use('/tweets', tweets);

module.exports = router;
