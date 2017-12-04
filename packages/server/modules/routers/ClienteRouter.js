const router = require('express').Router();
const ClientController = require('../controllers/ClienteController');

router.route('/')
    .get(ClientController.getAll)
    .post(ClientController.create);

router.route('/removed/:id')
  .get(ClientController.undelete);

router.route('/removed')
  .get(ClientController.getRemoved);

router.route('/:id')
    .get(ClientController.get)
    .delete(ClientController.remove)
    .put(ClientController.update);

module.exports = router;
