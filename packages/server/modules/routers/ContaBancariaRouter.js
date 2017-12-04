const router = require('express').Router();
const controller = require('../controllers/ContaBancariaController');

router.route('/')
  .get(controller.getAll)
  .post(controller.create);

router.route('/:id')
  .get(controller.get)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;
