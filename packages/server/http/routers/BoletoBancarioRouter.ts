import { Router } from 'express';
import { BoletoBancarioController } from '../controllers/BoletoBancarioController';

import { RepositoryBoleto } from '../../services/repository/repository-boleto';
import createBoletoValidator = require("../validators/boleto/create");
import updateBoletoValidator = require("../validators/boleto/update");

const controller = new BoletoBancarioController(new RepositoryBoleto());

const router = Router();

router.route('/')
  .get(controller.query)
  .post(createBoletoValidator, controller.create);

router.route('/:id')
  .get(controller.get)
  .put(updateBoletoValidator, controller.update)
  .delete(controller.remove);

export = router;
