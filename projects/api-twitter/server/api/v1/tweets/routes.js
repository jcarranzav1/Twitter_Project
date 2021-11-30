const express = require('express');
const controller = require('./controller');

const router = express.Router();

/*
 * /api/tweets      GET     -Get All
 * /api/tweets      POST    -Create Tweet
 * /api/tweets      GET     -Get a Tweet
 * /api/tweets      PUT     -Update a Tweet
 * /api/tweets      DELETE  -Delete a Tweet
 */

router.route('/').get(controller.all).post(controller.create);

router
    .route('/:id')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;
