const express = require('express');
const controller = require('./controller');
const tweetsRouter = require('../tweets/routes');

const router = express.Router();

/*
 * /api/users      GET     -Get All
 * users      POST    -Create users
 * /api/users      GET     -Get a user
 * /api/tweets      PUT     -Update a user
 * /api/users      DELETE  -Delete a user
 */

router.route('/').get(controller.all).post(controller.create);
router.param('id', controller.id);

// este middleware id corre antes que los middlewares de read, update y delete. Por eso se coloco antes.

// Se hace con el fin de evitar hacer .get(controller.id,controller.read).put(controller.id,controller.update)

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

router.use('/:user/tweets', tweetsRouter);
module.exports = router;
