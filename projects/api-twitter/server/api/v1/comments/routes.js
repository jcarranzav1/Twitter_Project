const express = require('express');
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model');

const router = express.Router();

/*
 * /api/comments          GET     -Get All
 * /api/comments          POST    -Create users
 * /api/comments/:id      GET     -Get a user
 * /api/comments/:id      PUT     -Update a user
 * /api/comments/:id      DELETE  -Delete a user
 */

router.route('/').get(controller.all).post(auth, sanitizers, controller.create);
router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(auth, owner, sanitizers, controller.update)
  .patch(auth, owner, sanitizers, controller.update)
  .delete(auth, owner, sanitizers, controller.delete);

module.exports = router;
