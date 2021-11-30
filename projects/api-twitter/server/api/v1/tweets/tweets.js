const express = require('express');

const router = express.Router();

router
    .route('/')
    .get((req, res, next) => {
        res.json({
            message: 'Get All Tweets',
        });
    })
    .post((req, res) => {
        res.json({
            message: 'Create a Tweet',
        });
    });

module.exports = router;
