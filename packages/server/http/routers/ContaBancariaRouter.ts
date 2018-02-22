import { Request, Response, Router } from 'express';
import { ContaBancariaController } from '../controllers/ContaBancariaController';

import { RepositoryContaBancaria } from '../../services/repository/repository-conta-bancaria';
import createContaValidator = require("../validators/conta-bancaria/create");

const router = Router();
const repoCB = new RepositoryContaBancaria();
const controller = new ContaBancariaController(repoCB);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post(createContaValidator, (req: Request, res: Response) => controller.create(req, res));

router.route('/:id')
  .get((req: Request, res: Response) => controller.get(req, res))
  .put(createContaValidator, (req: Request, res: Response) => controller.update(req, res))
  .delete((req: Request, res: Response) => controller.remove(req, res));

router.route('/recover/:id')
  .post((req: Request, res: Response) => controller.recover(req, res));

export = router;
