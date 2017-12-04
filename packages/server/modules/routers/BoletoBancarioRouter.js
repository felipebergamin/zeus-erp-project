const router = require('express').Router();
const BoletoBancarioController = require('../controllers/BoletoBancarioController');

router.route('/')
  .get(BoletoBancarioController.getAll)
  .post(BoletoBancarioController.create);

router.route('/:id')
  .get(BoletoBancarioController.get)
  .put(BoletoBancarioController.update)
  .delete(BoletoBancarioController.remove);

module.exports = router;
