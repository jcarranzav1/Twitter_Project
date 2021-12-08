const express = require('express');
const controller = require('./controller');

const router = express.Router();

/*
 * /api/comments          GET     -Get All
 * /api/comments          POST    -Create users
 * /api/comments/:id      GET     -Get a user
 * /api/comments/:id      PUT     -Update a user
 * /api/comments/:id      DELETE  -Delete a user
 */

router.route('/').get(controller.all).post(controller.create);
router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
