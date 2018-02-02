import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

import clienteValidators = require("../validators/cliente");

const router = Router();

router.route('/')
  .get(ClienteController.getAll)
  .post(clienteValidators, ClienteController.create);

router.route('/recover/:id')
  .post(ClienteController.undelete);

router.route('/removed')
  .get(ClienteController.getRemoved);

router.route('/:id')
  .get(ClienteController.get)
  .delete(ClienteController.remove)
  .put(clienteValidators, ClienteController.update);

export = router;
