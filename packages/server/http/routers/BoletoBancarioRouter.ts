import { Router } from 'express';
import { BoletoBancarioController } from '../controllers/BoletoBancarioController';

import createBoletoValidator = require("../validators/boleto/create");
import updateBoletoValidator = require("../validators/boleto/update");

const router = Router();

router.route('/')
  .get(BoletoBancarioController.query)
  .post(createBoletoValidator, BoletoBancarioController.create);

router.route('/:id')
  .get(BoletoBancarioController.get)
  .put(updateBoletoValidator, BoletoBancarioController.update)
  .delete(BoletoBancarioController.remove);

export = router;
