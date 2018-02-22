import { Router } from 'express';
import { ContaBancariaController } from '../controllers/ContaBancariaController';

import { RepositoryContaBancaria } from '../../services/repository/repository-conta-bancaria';
import createContaValidator = require("../validators/conta-bancaria/create");

const router = Router();
const repoCB = new RepositoryContaBancaria();
const controller = new ContaBancariaController(repoCB);

router.route('/')
  .get(controller.getAll)
  .post(createContaValidator, controller.create);

router.route('/:id')
  .get(controller.get)
  .put(createContaValidator, controller.update)
  .delete(controller.remove);

router.route('/recover/:id')
  .post(controller.recover);

export = router;
