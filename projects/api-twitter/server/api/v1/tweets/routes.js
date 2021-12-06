const express = require('express');
const controller = require('./controller');

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
  .post(controller.parentId, controller.create);

router.param('id', controller.parentId, controller.id);

// este middleware id corre antes que los middlewares de read, update y delete. Por eso se coloco antes.

// Se hace con el fin de evitar hacer .get(controller.id,controller.read).put(controller.id,controller.update)

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
