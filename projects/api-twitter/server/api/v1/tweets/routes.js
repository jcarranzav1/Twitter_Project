const express = require('express');
const controller = require('./controller');
const { auth, owner } = require('../auth');

const router = express.Router({
  mergeParams: true,
});

/*
 * /api/tweets          GET     -Get All
 * /api/tweets          POST    -Create Tweet
 * /api/tweets/:id      GET     -Get a Tweet
 * /api/tweets/:id      PUT     -Update a Tweet
 * /api/tweets/:id      DELETE  -Delete a Tweet
 */

router
  .route('/')
  .get(controller.parentId, controller.all)
  .post(controller.parentId, auth, controller.create);

router.param('id', controller.id);
// router param, solo corre un middelware, a diferencia de router.route que concatena middlewares.

// este middleware id corre antes que los middlewares de read, update y delete. Por eso se coloco antes.
// Se hace con el fin de evitar hacer .get(controller.id,controller.read).put(controller.id,controller.update)

router
  .route('/:id')
  .get(controller.parentId, controller.read)
  .put(controller.parentId, auth, owner, controller.update)
  .patch(controller.parentId, auth, owner, controller.update)
  .delete(controller.parentId, auth, owner, controller.delete);

module.exports = router;
