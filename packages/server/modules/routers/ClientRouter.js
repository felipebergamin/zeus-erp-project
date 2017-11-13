const router = require('express').Router();
const ClientController = require('../controllers/ClientController');

router.route('/')
    .get(ClientController.getAll)
    .post(ClientController.create);

router.route('/:id')
    .get(ClientController.get)
    .delete(ClientController.remove)
    .put(ClientController.update);

module.exports = router;