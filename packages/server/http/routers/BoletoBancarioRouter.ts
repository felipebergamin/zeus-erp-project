import { Request, Response, Router } from 'express';
import { BoletoBancarioController } from '../controllers/BoletoBancarioController';

import { RepositoryBoleto } from '../../services/repository/repository-boleto';
import createBoletoValidator = require("../validators/boleto/create");
import updateBoletoValidator = require("../validators/boleto/update");

const controller = new BoletoBancarioController(new RepositoryBoleto());

const router = Router();

router.route('/')
  .get((req, res) => controller.query(req, res))
  .post(createBoletoValidator, (req: Request, res: Response) => controller.create(req, res));

router.route('/:id')
  .get((req, res) => controller.get(req, res))
  .put(updateBoletoValidator, (req: Request, res: Response) => controller.update(req, res))
  .delete((req, res) => controller.remove(req, res));

export = router;
