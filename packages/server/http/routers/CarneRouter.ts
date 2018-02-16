import { Router } from 'express';

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
  .get(controller.getAll)
  .post(createCarneValidator, controller.create);

router.route('/:id')
  .get(controller.get)
  .delete(controller.remove);

export = router;
