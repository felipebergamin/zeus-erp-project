const router = require('express').Router();
const TecnicoController = require('../controllers/TecnicoController');

router.route('/')
  .get(TecnicoController.getAll)
  .post(TecnicoController.create);

router.route('/:id')
  .get(TecnicoController.get)
  .put(TecnicoController.update)
  .delete(TecnicoController.remove);

module.exports = router;
