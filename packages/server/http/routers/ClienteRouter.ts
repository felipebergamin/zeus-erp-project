import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

import createClientValidator = require("../validators/cliente/create");
import updateClientValidator = require("../validators/cliente/update");

const router = Router();

router.route('/')
  .get(ClienteController.getAll)
  .post(createClientValidator, ClienteController.create);

router.route('/recover/:id')
  .post(ClienteController.undelete);

router.route('/removed')
  .get(ClienteController.getRemoved);

router.route('/:id')
  .get(ClienteController.get)
  .delete(ClienteController.remove)
  .put(updateClientValidator, ClienteController.update);

export = router;
