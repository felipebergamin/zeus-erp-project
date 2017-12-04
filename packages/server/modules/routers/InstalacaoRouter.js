const router = require('express').Router();
const InstalacaoController = require('../controllers/InstalacaoController');

router.route('/')
  .get(InstalacaoController.getAll)
  .post(InstalacaoController.create);

router.route('/:id')
  .get(InstalacaoController.get)
  .put(InstalacaoController.update)
  .delete(InstalacaoController.remove);

module.exports = router;
