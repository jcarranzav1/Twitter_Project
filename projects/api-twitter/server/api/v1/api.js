const express = require('express');
const tweets = require('./tweets/routes');

const router = express.Router();
router.use('/tweets', tweets);

module.exports = router;
