import { Request, Response, Router } from 'express';

import { CarneController } from '../controllers/CarneController';

import { RepositoryBoleto } from '../../services/repository/repository-boleto';
import { RepositoryCarne } from '../../services/repository/repository-carne';
import { RepositoryCliente } from '../../services/repository/repository-cliente';

import createCarneValidator = require("../validators/carne/create");

const router = Router();

const repoBoleto = new RepositoryBoleto();
const repoCliente = new RepositoryCliente();
const repoCarne = new RepositoryCarne(repoBoleto, repoCliente);

const controller = new CarneController(repoCarne);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post(createCarneValidator, (req: Request, res: Response) => controller.create(req, res));

router.route('/:id')
  .get((req: Request, res: Response) => controller.get(req, res))
  .delete((req: Request, res: Response) => controller.remove(req, res));

export = router;
