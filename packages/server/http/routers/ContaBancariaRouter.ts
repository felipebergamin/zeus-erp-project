import { Router } from 'express';
import { ContaBancariaController } from '../controllers/ContaBancariaController';

import createContaValidator = require("../validators/conta-bancaria/create");

const router = Router();

router.route('/')
  .get(ContaBancariaController.getAll)
  .post(createContaValidator, ContaBancariaController.create);

router.route('/:id')
  .get(ContaBancariaController.get)
  .put(createContaValidator, ContaBancariaController.update)
  .delete(ContaBancariaController.remove);

router.route('/recover/:id')
  .post(ContaBancariaController.recover);

export = router;
